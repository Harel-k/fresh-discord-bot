const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'untimeout',

  async run(interaction) {

    const member = interaction.options.getMember('user');

    await member.timeout(null);

    await sendLog(
      interaction.guild,
      '♻️ Timeout Removed',
      `User: ${member.user.tag}\nModerator: ${interaction.user.tag}`
    );

    await interaction.reply(`✅ Timeout removed for ${member.user.tag}`);
  }
};
