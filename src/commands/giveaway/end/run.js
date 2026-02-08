const { EmbedBuilder } = require('discord.js');
const manager = require('../../../systems/giveawayManager');

module.exports = {
  name: 'gend',
  defaultPerms: ['ManageGuild'],

  async run(interaction) {

    const messageId = interaction.options.getString('messageid');

    const data = manager.getAll();
    const giveaways = data[interaction.guild.id] || [];

    const g = giveaways.find(x => x.messageId === messageId);

    if (!g)
      return interaction.reply({ content: '❌ Giveaway not found.', ephemeral: true });

    const channel = interaction.guild.channels.cache.get(g.channelId);
    const msg = await channel.messages.fetch(g.messageId);

    const winners = g.entries
      .sort(() => 0.5 - Math.random())
      .slice(0, g.winners);

    const winnerText = winners.length
      ? winners.map(id => `<@${id}>`).join(', ')
      : 'No one joined 😭';

    const endedEmbed = new EmbedBuilder()
      .setColor('#ff4444')
      .setTitle('🎉 GIVEAWAY ENDED 🎉')
      .setDescription(
`**Prize:** ${g.prize}
**Winners:** ${winnerText}
**Total Entries:** ${g.entries.length}`
      );

    await msg.edit({
      embeds: [endedEmbed],
      components: []
    });

    manager.remove(interaction.guild.id, messageId);

    await interaction.reply({ content: '✅ Giveaway ended.', ephemeral: true });
  }
};
