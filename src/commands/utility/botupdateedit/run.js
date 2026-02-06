const { EmbedBuilder } = require('discord.js');
const manager = require('../../../systems/botUpdateManager');

module.exports = {
  name: 'botupdateedit',
  ownerOnly: true,

  async run(interaction, client) {

    await interaction.deferReply({ ephemeral: true });

    const message = interaction.options.getString('message');

    const configs = manager.getAll();

    let edited = 0;

    for (const [guildId, config] of Object.entries(configs)) {

      try {
        if (!config.lastMessage) continue;

        const guild = client.guilds.cache.get(guildId);
        if (!guild) continue;

        const channel = guild.channels.cache.get(config.channel);
        if (!channel) continue;

        const msg = await channel.messages.fetch(config.lastMessage);

        const embed = new EmbedBuilder()
          .setColor('#22c55e')
          .setTitle('🌿 Fresh Bot Update')
          .setDescription(message)
          .setTimestamp();

        await msg.edit({ embeds: [embed] });

        edited++;

      } catch {}
    }

    return interaction.editReply(`✏️ Edited last update in ${edited} servers`);
  }
};
