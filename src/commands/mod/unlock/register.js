const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('unlock')
  .setDescription('Unlock channel')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);
