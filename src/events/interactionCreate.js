const {
  ActionRowBuilder,
  RoleSelectMenuBuilder
} = require('discord.js');

const permSystem = require('../systems/permissionSystem');

module.exports = {
  name: 'interactionCreate',

  async execute(interaction, client) {

      // =============================
      // ALL BUTTONS HANDLER (FIXED)
      // =============================
      if (interaction.isButton()) {
      
        if (!interaction.inGuild()) {
          return interaction.reply({ content: 'This only works in servers.', ephemeral: true });
        }
      
        const member = interaction.member;
      
        if (interaction.isButton() && interaction.customId === 'gw_join') {

        const manager = require('../systems/giveawayManager');
        const fs = require('fs');
        const path = require('path');

        const data = manager.getAll();
        const giveaways = data[interaction.guild.id] || [];

        const g = giveaways.find(x => x.messageId === interaction.message.id);
        if (!g) return;

        if (g.entries.includes(interaction.user.id)) {
          return interaction.reply({
            content: '⚠️ You already joined!',
            ephemeral: true
          });
        }

    g.entries.push(interaction.user.id);

    fs.writeFileSync(
      path.join(__dirname, '..', 'data', 'giveaways.json'),
      JSON.stringify(data, null, 2)
    );

    return interaction.reply({
      content: '🎉 Joined successfully!',
      ephemeral: true
    });
  }

    /* ============================= */
    /* SELECT MENUS (setperms)       */
    /* ============================= */

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

    /* ============================= */
    /* SLASH COMMANDS                */
    /* ============================= */

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {

      /* ============================= */
      /* OWNER ONLY                   */
      /* ============================= */

      if (command.ownerOnly && interaction.guild.ownerId !== interaction.user.id)
        return;

      /* ============================= */
      /* OWNER BYPASS                 */
      /* ============================= */

      if (interaction.user.id !== process.env.CLIENT_OWNER_ID) {

        // 1️⃣ Custom role permissions (setperms)
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

        // 2️⃣ Default Discord permissions
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

      /* ============================= */
      /* RUN COMMAND                  */
      /* ============================= */

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
  }
}
};
