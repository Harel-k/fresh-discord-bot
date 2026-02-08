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

    try {

      // ✅ reply IMMEDIATELY (no defer, no double edit)
      await interaction.reply({
        content: '⏳ Creating giveaway...',
        ephemeral: true
      });

      const minutes = interaction.options.getInteger('minutes');
      const winners = interaction.options.getInteger('winners');
      const prize = interaction.options.getString('prize');

      if (!minutes || minutes <= 0)
        return interaction.editReply('❌ Minutes must be > 0');

      if (!winners || winners <= 0)
        return interaction.editReply('❌ Winners must be > 0');

      if (!prize)
        return interaction.editReply('❌ Prize is required');

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

      // heavy work AFTER reply
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

      // final update (safe)
      await interaction.editReply('✅ Giveaway created successfully!');

    } catch (err) {

      console.error('GSTART ERROR:', err);

      if (!interaction.replied)
        await interaction.reply({ content: '❌ Failed.', ephemeral: true });
      else
        await interaction.editReply('❌ Failed.');
    }
  }
};
