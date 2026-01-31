const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('setlogchannel')
  .setDescription('Set moderation logs channel')
  .addChannelOption(o =>
    o.setName('channel')
      .setDescription('Channel for logs')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
