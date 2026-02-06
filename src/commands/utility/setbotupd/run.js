const botUpdateManager = require('../../../systems/botUpdateManager');

module.exports = {
  name: 'setbotupd',
  defaultPerms: ['ManageGuild'],

  async run(interaction) {

    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');
    const pingChoice = interaction.options.getString('ping');

    let ping = null;

    if (role) ping = `<@&${role.id}>`;
    else if (pingChoice === 'everyone') ping = '@everyone';
    else if (pingChoice === 'here') ping = '@here';

    botUpdateManager.setConfig(interaction.guild.id, channel.id, ping);

    return interaction.reply({
      content: `✅ Updates set to <#${channel.id}> ${ping ? `with ping ${ping}` : ''}`,
      ephemeral: true
    });
  }
};
