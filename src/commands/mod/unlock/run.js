const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'unlock',

  async run(interaction) {

    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: null
    });

    await sendLog(
      interaction.guild,
      '🔓 Channel Unlocked',
      `Moderator: ${interaction.user.tag}\nChannel: ${interaction.channel}`
    );

    await interaction.reply('✅ Channel unlocked');
  }
};
