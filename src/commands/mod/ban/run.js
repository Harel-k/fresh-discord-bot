module.exports = {
  name: 'ban',
  defaultPerms: ['BanMembers'],

  async run(interaction) {

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // DM user
    try {
      await user.send(
        `🔨 You were **banned** from **${interaction.guild.name}**\n📝 Reason: ${reason}`
      );
    } catch {}

    await interaction.guild.members.ban(user.id, { reason });

    await interaction.reply(
      `🔨 Banned **${user.tag}**\n📝 Reason: ${reason}`
    );
  }
};
