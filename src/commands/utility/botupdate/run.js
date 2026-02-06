const { EmbedBuilder } = require('discord.js');
const manager = require('../../../systems/botUpdateManager');

module.exports = {
  name: 'botupdate',
  ownerOnly: true,

  async run(interaction, client) {

    await interaction.deferReply({ ephemeral: true });

    const message = interaction.options.getString('message');
    const shouldPing = interaction.options.getBoolean('ping') ?? false;

    const configs = manager.getAll();

    let sent = 0;

    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setTitle('🌿 Fresh Bot Update')
      .setDescription(message)
      .setFooter({ text: `Sent by ${interaction.user.tag}` })
      .setTimestamp();

    for (const [guildId, config] of Object.entries(configs)) {

      try {
        const guild = client.guilds.cache.get(guildId);
        if (!guild) continue;

        const channel = guild.channels.cache.get(config.channel);
        if (!channel) continue;

        // ✅ send ping separately ONLY when needed
        if (shouldPing && config.ping) {
          await channel.send(config.ping);
        }

        const msg = await channel.send({ embeds: [embed] });

        manager.setLastMessage(guildId, msg.id);

        sent++;

      } catch {}
    }

    return interaction.editReply(`✅ Sent update to ${sent} servers`);
  }
};
