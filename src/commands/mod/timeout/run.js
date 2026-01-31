module.exports = {
  name: 'timeout',
  defaultPerms: ['ModerateMembers'],

  async run(interaction) {

    const member = interaction.options.getMember('user');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // DM user
    try {
      await member.user.send(
        `⏳ You were **timed out** in **${interaction.guild.name}** for **${minutes} minutes**\n📝 Reason: ${reason}`
      );
    } catch {}

    await member.timeout(minutes * 60 * 1000, reason);

    await interaction.reply(
      `⏳ Timed out **${member.user.tag}** for **${minutes} minutes**\n📝 Reason: ${reason}`
    );
  }
};
