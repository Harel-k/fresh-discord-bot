const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const manager = require('../../../systems/giveawayManager');

module.exports = {
  name: 'gstart',
  defaultPerms: ['ManageGuild'],

  async run(interaction) {

    const minutes = interaction.options.getInteger('minutes');
    const winners = interaction.options.getInteger('winners');
    const prize = interaction.options.getString('prize');

    const endTime = Date.now() + minutes * 60000;

    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setTitle('🎉 GIVEAWAY 🎉')
      .setDescription(
`**Prize:** ${prize}
**Winners:** ${winners}
**Ends:** <t:${Math.floor(endTime/1000)}:R>

**Entries:** 0

Click 🎉 to join!`
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('gw_join')
        .setLabel('🎉 Join')
        .setStyle(ButtonStyle.Success)
    );

    // ⭐ IMPORTANT: reply instead of channel.send
    const msg = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true
    });

    manager.create(interaction.guild.id, {
      messageId: msg.id,
      channelId: msg.channel.id,
      prize,
      winners,
      endTime,
      entries: []
    });
  }
};
