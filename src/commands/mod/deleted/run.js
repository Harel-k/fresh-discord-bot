const { EmbedBuilder } = require('discord.js');
const deleteCache = require('../../../utils/deleteCache');

module.exports = {
  name: 'deleted',

  async run(interaction) {

    // ALWAYS acknowledge instantly
    await interaction.deferReply({ ephemeral: true });

    try {

      const messages = deleteCache.get(interaction.channel.id) || [];

      if (messages.length === 0) {
        return interaction.editReply({
          content: 'No deleted messages in last 2 hours.'
        });
      }

      const recent = messages.slice(-10).reverse();

      const description = recent.map(m =>
        `**${m.author}**\n${m.content}\n<t:${Math.floor(m.time / 1000)}:R>`
      ).join('\n\n');

      const embed = new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle('🗑 Deleted Messages (last 2h)')
        .setDescription(description);

      await interaction.editReply({ embeds: [embed] });

    } catch (err) {

      console.error('Deleted command error:', err);

      await interaction.editReply({
        content: '❌ Failed to fetch deleted messages.'
      });
    }
  }
};
