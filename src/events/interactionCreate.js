const {
  ActionRowBuilder,
  RoleSelectMenuBuilder
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

        const member = interaction.member;

        /* ===================================== */
        /* NORMAL REACTION ROLES (rr_)           */
        /* ===================================== */

        if (interaction.customId.startsWith('rr_')) {

          const roleId = interaction.customId.slice(3);
          const role = interaction.guild.roles.cache.get(roleId);

          if (!role)
            return interaction.reply({ content: 'Role not found.', ephemeral: true });

          if (member.roles.cache.has(roleId)) {
            await member.roles.remove(roleId);
            return interaction.reply({ content: `❌ Removed <@&${roleId}>`, ephemeral: true });
          } else {
            await member.roles.add(roleId);
            return interaction.reply({ content: `✅ Added <@&${roleId}>`, ephemeral: true });
          }
        }

        /* ===================================== */
        /* ONE ROLE ONLY (orr|)                  */
        /* ===================================== */

        if (interaction.customId.startsWith('orr|')) {

          await interaction.deferReply({ ephemeral: true });

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

          } catch {
            return interaction.editReply('❌ Failed (check role hierarchy)');
          }
        }

        /* ===================================== */
        /* GIVEAWAY JOIN (gw_join) ⭐ FINAL FIX   */
        /* ===================================== */

        if (interaction.customId === 'gw_join') {

          // 🔴 ALWAYS defer first (prevents timeout crash)
          await interaction.deferReply({ ephemeral: true });

          const manager = require('../systems/giveawayManager');

          const data = manager.getAll();
          const giveaways = data[interaction.guild.id] || [];

          const g = giveaways.find(x => x.messageId === interaction.message.id);

          // ALWAYS reply (never silent return)
          if (!g) {
            return interaction.editReply('❌ Giveaway already ended.');
          }

          if (g.entries.includes(interaction.user.id)) {
            return interaction.editReply('⚠️ You already joined!');
          }

          g.entries.push(interaction.user.id);

          fs.writeFileSync(
            path.join(__dirname, '..', 'data', 'giveaways.json'),
            JSON.stringify(data, null, 2)
          );

          return interaction.editReply('🎉 Joined successfully!');
        }

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

      try {

        // BOT OWNER ONLY
        if (command.ownerOnly && interaction.user.id !== process.env.CLIENT_OWNER_ID) {
          return interaction.reply({
            content: '❌ Only the bot owner can use this command.',
            ephemeral: true
          });
        }

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

        await command.run(interaction, client);

      } catch (err) {

        console.error('🔥 COMMAND ERROR:', err);

        if (!interaction.replied) {
          await interaction.reply({
            content: '❌ Error running command.',
            ephemeral: true
          });
        }
      }

    } catch (err) {

      // GLOBAL SAFETY (prevents "application did not respond")
      console.error('🔥 INTERACTION ERROR:', err);

      if (interaction.isRepliable() && !interaction.replied) {
        await interaction.reply({
          content: '❌ Something went wrong.',
          ephemeral: true
        });
      }
    }
  }
};
