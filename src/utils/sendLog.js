const { EmbedBuilder } = require('discord.js');
const logs = require('./logManager');

module.exports = async function sendLog(guild, title, description, color = 0xef4444) {

  const channelId = logs.getChannel(guild.id);
  if (!channelId) return;

  const channel = guild.channels.cache.get(channelId);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp();

  channel.send({ embeds: [embed] }).catch(() => {});
};
