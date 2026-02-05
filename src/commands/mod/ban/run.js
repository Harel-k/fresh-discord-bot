const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'ban',

  async run(interaction) {

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason';

    await interaction.guild.members.ban(user.id, { reason });

    await user.send(`You were banned from **${interaction.guild.name}**\nReason: ${reason}`).catch(() => {});

    await sendLog(
      interaction.guild,
      '🔨 User Banned',
      `User: ${user.tag}\nModerator: ${interaction.user.tag}\nReason: ${reason}`
    );

    await interaction.reply(`✅ Banned ${user.tag}`);
  }
};
