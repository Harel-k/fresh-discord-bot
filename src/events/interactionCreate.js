const {
  ActionRowBuilder,
  RoleSelectMenuBuilder,
  EmbedBuilder
} = require('discord.js');

const fs = require('fs');
const path = require('path');

const permSystem = require('../systems/permissionSystem');

module.exports = {
  name: 'interactionCreate',

  async execute(interaction, client) {

    try {

      /* ===================================================== */
      /* ===================== BUTTONS ======================= */
      /* ===================================================== */

      if (interaction.isButton()) {

        if (!interaction.inGuild()) {
          return interaction.reply({ content: 'This only works in servers.', ephemeral: true });
        }

        // ✅ Always defer immediately for ANY button
        // (prevents Unknown interaction / timeouts)
        if (!interaction.deferred && !interaction.replied) {
          await interaction.deferReply({ ephemeral: true });
        }

        const member = interaction.member;

        /* ===================================== */
        /* NORMAL REACTION ROLES (rr_)           */
        /* ===================================== */

        if (interaction.customId.startsWith('rr_')) {

          const roleId = interaction.customId.slice(3);
          const role = interaction.guild.roles.cache.get(roleId);

          if (!role) {
            return interaction.editReply('❌ Role not found.');
          }

          try {

            if (member.roles.cache.has(roleId)) {
              await member.roles.remove(roleId);
              return interaction.editReply(`❌ Removed <@&${roleId}>`);
            } else {
              await member.roles.add(roleId);
              return interaction.editReply(`✅ Added <@&${roleId}>`);
            }

          } catch (err) {
            console.error('RR ERROR:', err);
            return interaction.editReply('❌ Missing permissions or role hierarchy issue.');
          }
        }

        /* ===================================== */
        /* ONE ROLE ONLY (orr|)                  */
        /* ===================================== */

        if (interaction.customId.startsWith('orr|')) {

          try {

            const [, clickedRole, allRolesStr] = interaction.customId.split('|');
            const allRoles = allRolesStr.split(',');

            for (const id of allRoles) {
              if (member.roles.cache.has(id)) {
                await member.roles.remove(id);
              }
            }

            await member.roles.add(clickedRole);

            return interaction.editReply('✅ Role switched');

          } catch (err) {
            console.error('ORR ERROR:', err);
            return interaction.editReply('❌ Failed (check role hierarchy)');
          }
        }

        /* ===================================== */
        /* GIVEAWAY JOIN (gw_join)               */
        /* + duplicate protection                */
        /* + LIVE entry counter on embed         */
        /* ===================================== */

        if (interaction.customId === 'gw_join') {

          const manager = require('../systems/giveawayManager');

          const data = manager.getAll();
          const giveaways = data[interaction.guild.id] || [];

          const g = giveaways.find(x => x.messageId === interaction.message.id);

          if (!g) {
            return interaction.editReply('❌ Giveaway already ended.');
          }

          if (g.entries.includes(interaction.user.id)) {
            return interaction.editReply('⚠️ You already joined!');
          }

          g.entries.push(interaction.user.id);

          // Save using your manager
          // (assumes your giveawayManager exposes saveAll)
          manager.saveAll(data);

          // ✅ Update entries count on the giveaway embed (if it contains "**Entries:** X")
          try {
            const oldEmbed = interaction.message.embeds?.[0];
            if (oldEmbed) {

              const embed = EmbedBuilder.from(oldEmbed);

              const oldDesc = embed.data.description || '';
              const newDesc = oldDesc.replace(
                /\*\*Entries:\*\*\s*\d+/,
                `**Entries:** ${g.entries.length}`
              );

              // Only set if changed (avoid unnecessary edits)
              if (newDesc !== oldDesc) {
                embed.setDescription(newDesc);

                await interaction.message.edit({
                  embeds: [embed]
                });
              }
            }
          } catch (err) {
            // Don’t fail the join if embed edit fails
            console.error('GW EMBED UPDATE ERROR:', err);
          }

          return interaction.editReply('🎉 Joined successfully!');
        }

        // Unknown button → just quietly succeed
        return;
      }

      /* ===================================================== */
      /* ================= SELECT MENUS ====================== */
      /* ===================================================== */

      if (interaction.isStringSelectMenu()) {

        if (interaction.customId === 'perm_command_select') {

          const commandName = interaction.values[0];

          const roleMenu = new RoleSelectMenuBuilder()
            .setCustomId(`perm_roles_${commandName}`)
            .setPlaceholder('Select allowed roles')
            .setMinValues(1)
            .setMaxValues(10);

          const row = new ActionRowBuilder().addComponents(roleMenu);

          return interaction.update({
            content: `Select roles allowed for **/${commandName}**`,
            components: [row]
          });
        }
      }

      if (interaction.isRoleSelectMenu()) {

        if (interaction.customId.startsWith('perm_roles_')) {

          const commandName = interaction.customId.replace('perm_roles_', '');

          permSystem.setAllowedRoles(commandName, interaction.values);

          return interaction.update({
            content: `✅ Permissions updated for **/${commandName}**`,
            components: []
          });
        }
      }

      /* ===================================================== */
      /* ================= SLASH COMMANDS ==================== */
      /* ===================================================== */

      if (!interaction.isChatInputCommand()) return;

      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      /* ===================================== */
      /* OWNER ONLY                            */
      /* ===================================== */

      if (command.ownerOnly && interaction.user.id !== process.env.CLIENT_OWNER_ID) {
        return interaction.reply({
          content: '❌ Only the bot owner can use this.',
          ephemeral: true
        });
      }

      /* ===================================== */
      /* PERMISSIONS                           */
      /* ===================================== */

      if (interaction.user.id !== process.env.CLIENT_OWNER_ID) {

        const allowedRoles = permSystem.getAllowedRoles(command.name);

        if (allowedRoles.length > 0) {

          const hasRole = interaction.member.roles.cache.some(r =>
            allowedRoles.includes(r.id)
          );

          if (!hasRole) {
            return interaction.reply({
              content: '❌ You don’t have permission.',
              ephemeral: true
            });
          }
        }

        else if (command.defaultPerms?.length) {

          const missing = command.defaultPerms.filter(
            perm => !interaction.member.permissions.has(perm)
          );

          if (missing.length) {
            return interaction.reply({
              content: '❌ Missing required permissions.',
              ephemeral: true
            });
          }
        }
      }

      /* ===================================== */
      /* RUN COMMAND                           */
      /* IMPORTANT: protect against timeouts    */
      /* ===================================== */

      try {
        // If command forgets to reply quickly, we can still avoid timeouts
        // by letting the command decide. We don't auto-defer here because
        // some commands might want immediate reply, but we DO catch errors.
        await command.run(interaction, client);
      } catch (err) {
        console.error('🔥 COMMAND RUN ERROR:', err);

        if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: '❌ Error running command.',
            ephemeral: true
          });
        } else if (interaction.isRepliable() && interaction.deferred && !interaction.replied) {
          await interaction.editReply('❌ Error running command.');
        }
      }

    } catch (err) {

      console.error('🔥 INTERACTION ERROR:', err);

      if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '❌ Something went wrong.',
          ephemeral: true
        });
      } else if (interaction.isRepliable() && interaction.deferred && !interaction.replied) {
        await interaction.editReply('❌ Something went wrong.');
      }
    }
  }
};
