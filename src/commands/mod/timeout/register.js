const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('Timeout a member')
  .addUserOption(o => o.setName('user').setDescription('User').setRequired(true))
  .addIntegerOption(o => o.setName('minutes').setDescription('Minutes').setRequired(true))
  .addStringOption(o => o.setName('reason').setDescription('Reason'))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);
