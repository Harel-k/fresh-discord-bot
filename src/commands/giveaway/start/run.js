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

    // ✅ Always defer so you never timeout
    await interaction.deferReply({ ephemeral: true });

    try {

      const minutes = interaction.options.getInteger('minutes');
      const winners = interaction.options.getInteger('winners');
      const prize = interaction.options.getString('prize');

      if (!minutes || minutes <= 0) {
        return interaction.editReply('❌ Minutes must be 1 or more.');
      }

      if (!winners || winners <= 0) {
        return interaction.editReply('❌ Winners must be 1 or more.');
      }

      if (!prize || prize.length < 1) {
        return interaction.editReply('❌ Prize is required.');
      }

      const endTime = Date.now() + minutes * 60000;

      const embed = new EmbedBuilder()
        .setColor('#22c55e')
        .setTitle('🎉 GIVEAWAY 🎉')
        .setDescription(
          `**Prize:** ${prize}\n` +
          `**Winners:** ${winners}\n` +
          `**Ends:** <t:${Math.floor(endTime / 1000)}:R>\n\n` +
          `**Entries:** 0\n\n` +
          `Click 🎉 to join!`
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('gw_join')
          .setLabel('🎉 Join')
          .setStyle(ButtonStyle.Success)
      );

      // ✅ Send ONE message only
      const msg = await interaction.channel.send({
        embeds: [embed],
        components: [row]
      });

      manager.create(interaction.guild.id, {
        messageId: msg.id,
        channelId: interaction.channel.id,
        prize,
        winners,
        endTime,
        entries: []
      });

      return interaction.editReply('✅ Giveaway started!');

    } catch (err) {
      console.error('GSTART ERROR:', err);
      return interaction.editReply('❌ Failed to start giveaway.');
    }
  }
};
