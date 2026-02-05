const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'purge',

  async run(interaction) {

    const amount = interaction.options.getInteger('amount');

    await interaction.channel.bulkDelete(amount, true);

    await sendLog(
      interaction.guild,
      '🧹 Messages Purged',
      `Moderator: ${interaction.user.tag}\nDeleted: ${amount}`
    );

    await interaction.reply({ content: `✅ Deleted ${amount} messages`, ephemeral: true });
  }
};
