const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('unban')
  .setDescription('Unban a user')
  .addStringOption(o => o.setName('userid').setDescription('User ID').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
