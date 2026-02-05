const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('Lock channel')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);
