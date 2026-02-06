const { EmbedBuilder } = require('discord.js');
const botUpdateManager = require('../../../systems/botUpdateManager');

module.exports = {
  name: 'botupdate',
  ownerOnly: true, // ONLY YOU

  async run(interaction, client) {

    await interaction.deferReply({ ephemeral: true });

    const message = interaction.options.getString('message');

    const configs = botUpdateManager.getAll();

    let sent = 0;
    let failed = 0;

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

        await channel.send({
          content: config.ping || null,
          embeds: [embed],
          allowedMentions: { parse: ['everyone', 'roles'] }
        });

        sent++;

      } catch {
        failed++;
      }
    }

    return interaction.editReply(
      `✅ Broadcast sent to **${sent}** servers\n❌ Failed: ${failed}`
    );
  }
};
