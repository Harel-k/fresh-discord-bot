const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('gstart')
  .setDescription('Start a giveaway')

  .addIntegerOption(o =>
    o.setName('minutes')
      .setDescription('Duration in minutes')
      .setRequired(true))

  .addIntegerOption(o =>
    o.setName('winners')
      .setDescription('Number of winners')
      .setRequired(true))

  .addStringOption(o =>
    o.setName('prize')
      .setDescription('Prize')
      .setRequired(true))

  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
