const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'lock',

  async run(interaction) {

    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false
    });

    await sendLog(
      interaction.guild,
      '🔒 Channel Locked',
      `Moderator: ${interaction.user.tag}\nChannel: ${interaction.channel}`
    );

    await interaction.reply('✅ Channel locked');
  }
};
