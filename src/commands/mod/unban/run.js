module.exports = {
  name: 'unban',
  defaultPerms: ['BanMembers'],

  async run(interaction) {

    const id = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.guild.members.unban(id, reason);

    await interaction.reply(
      `✅ Unbanned user ID **${id}**\n📝 Reason: ${reason}`
    );
  }
};
