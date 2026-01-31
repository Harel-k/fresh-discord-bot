const { EmbedBuilder } = require('discord.js');
const logs = require('../../../utils/logManager');

module.exports = {
  name: 'setlogchannel',

  async run(interaction) {
    const channel = interaction.options.getChannel('channel');

    logs.setChannel(interaction.guild.id, channel.id);

    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setDescription(`✅ Logs channel set to ${channel}`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
