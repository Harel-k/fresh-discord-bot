const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder
} = require('discord.js');

const permSystem = require('../../../systems/permissionSystem');

module.exports = {
  name: 'setperms',
  ownerOnly: true, // hidden system command

  async run(interaction, client) {

    // server owner only
    if (interaction.guild.ownerId !== interaction.user.id)
      return;

    const options = [];

    client.commands.forEach(cmd => {

      // ✅ hide system commands from menu
      if (cmd.ownerOnly) return;

      options.push({
        label: cmd.name,
        value: cmd.name
      });
    });

    const menu = new StringSelectMenuBuilder()
      .setCustomId('perm_command_select')
      .setPlaceholder('Select a command')
      .addOptions(options);

    const row = new ActionRowBuilder().addComponents(menu);

    await interaction.reply({
      content: 'Select a command:',
      components: [row],
      ephemeral: true
    });
  }
};
