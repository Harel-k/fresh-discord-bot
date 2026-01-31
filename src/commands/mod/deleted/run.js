const { EmbedBuilder } = require('discord.js');
const cache = require('../../../utils/deleteCache');

module.exports = {
  name: 'deleted',

  async run(interaction) {

    const messages = cache.get(interaction.channel.id);

    if (!messages.length) {
      return interaction.reply({
        content: 'No deleted messages in last 2 hours.',
        ephemeral: true
      });
    }

    const recent = messages.slice(-10).reverse(); // last 10 only

    const embed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('🗑 Deleted Messages (last 2h)')
      .setDescription(
        recent.map(m =>
          `**${m.author}**\n${m.content}\n<t:${Math.floor(m.time/1000)}:R>`
        ).join('\n\n')
      );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};
