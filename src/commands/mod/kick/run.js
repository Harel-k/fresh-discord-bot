const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'kick',

  async run(interaction) {

    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason';

    await member.send(`You were kicked from **${interaction.guild.name}**\nReason: ${reason}`).catch(() => {});
    await member.kick(reason);

    await sendLog(
      interaction.guild,
      '👢 User Kicked',
      `User: ${member.user.tag}\nModerator: ${interaction.user.tag}\nReason: ${reason}`
    );

    await interaction.reply(`✅ Kicked ${member.user.tag}`);
  }
};
