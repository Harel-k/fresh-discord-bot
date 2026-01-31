module.exports = {
  name: 'purge',
  defaultPerms: ['ManageMessages'],

  async run(interaction) {

    const amount = interaction.options.getInteger('amount');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.channel.bulkDelete(amount, true);

    await interaction.reply({
      content: `🧹 Deleted **${amount}** messages\n📝 Reason: ${reason}`,
      ephemeral: true
    });
  }
};
