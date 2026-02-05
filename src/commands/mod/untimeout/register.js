const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('untimeout')
  .setDescription('Remove timeout')
  .addUserOption(o => o.setName('user').setDescription('User').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);
