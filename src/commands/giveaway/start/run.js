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

    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setTitle('🎉 Giveaway')
      .setDescription(`Prize: **${prize}**
Winners: **${winners}**
Click to join!`);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('gw_join')
        .setLabel('🎉 Join')
        .setStyle(ButtonStyle.Success)
    );

    const msg = await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

    manager.create(interaction.guild.id, {
      messageId: msg.id,
      channelId: interaction.channel.id,
      prize,
      winners,
      entries: []
    });

    await interaction.reply({
      content: '✅ Giveaway started!',
      ephemeral: true
    });
  }
};
