module.exports = {
  name: 'untimeout',
  defaultPerms: ['ModerateMembers'],

  async run(interaction) {

    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await member.timeout(null);

    // DM user
    try {
      await member.user.send(
        `✅ Your timeout in **${interaction.guild.name}** was removed\n📝 Reason: ${reason}`
      );
    } catch {}

    await interaction.reply(
      `✅ Removed timeout from **${member.user.tag}**\n📝 Reason: ${reason}`
    );
  }
};
