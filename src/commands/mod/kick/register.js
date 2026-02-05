const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kick a member')
  .addUserOption(o => o.setName('user').setDescription('User').setRequired(true))
  .addStringOption(o => o.setName('reason').setDescription('Reason'))
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);
