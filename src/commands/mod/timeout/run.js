const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'timeout',

  async run(interaction) {

    const member = interaction.options.getMember('user');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason';

    await member.timeout(minutes * 60 * 1000, reason);

    await sendLog(
      interaction.guild,
      '⏳ User Timed Out',
      `User: ${member.user.tag}\nModerator: ${interaction.user.tag}\nDuration: ${minutes}m\nReason: ${reason}`
    );

    await interaction.reply(`✅ Timed out ${member.user.tag}`);
  }
};
