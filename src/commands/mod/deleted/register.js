const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('deleted')
  .setDescription('Show deleted messages from last 2 hours in this channel')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
