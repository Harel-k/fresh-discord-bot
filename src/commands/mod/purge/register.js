const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Delete messages')
  .addIntegerOption(o => o.setName('amount').setDescription('1-100').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
