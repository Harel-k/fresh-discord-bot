const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'unban',

  async run(interaction) {

    const id = interaction.options.getString('userid');

    await interaction.guild.members.unban(id);

    await sendLog(
      interaction.guild,
      '♻️ User Unbanned',
      `User ID: ${id}\nModerator: ${interaction.user.tag}`
    );

    await interaction.reply(`✅ Unbanned ${id}`);
  }
};
