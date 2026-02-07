const manager = require('../systems/giveawayManager');

module.exports = {
  name: 'ready',

  async execute(client) {

    console.log('🎉 Giveaway scheduler started');

    setInterval(async () => {

      const data = manager.getAll();

      for (const [guildId, giveaways] of Object.entries(data)) {

        for (const g of giveaways) {

          // not finished yet
          if (Date.now() < g.endTime) continue;

          try {

            const guild = client.guilds.cache.get(guildId);
            if (!guild) continue;

            const channel = guild.channels.cache.get(g.channelId);
            if (!channel) continue;

            const msg = await channel.messages.fetch(g.messageId);

            // pick winners
            const winners = g.entries
              .sort(() => 0.5 - Math.random())
              .slice(0, g.winners);

            const text = winners.length
              ? winners.map(id => `<@${id}>`).join(', ')
              : 'No one joined 😭';

            await msg.edit({
              content: `🎉 **Giveaway Ended!**
Prize: **${g.prize}**
Winners: ${text}`,
              components: []
            });

            manager.remove(guildId, g.messageId);

          } catch (e) {
            console.log('Giveaway auto end error:', e.message);
          }

        }

      }

    }, 5000); // checks every 5 seconds
  }
};
