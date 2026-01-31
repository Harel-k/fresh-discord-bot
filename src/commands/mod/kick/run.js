module.exports = {
  name: 'kick',
  defaultPerms: ['KickMembers'],

  async run(interaction) {

    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // DM user
    try {
      await member.user.send(
        `👢 You were **kicked** from **${interaction.guild.name}**\n📝 Reason: ${reason}`
      );
    } catch {}

    await member.kick(reason);

    await interaction.reply(
      `👢 Kicked **${member.user.tag}**\n📝 Reason: ${reason}`
    );
  }
};
