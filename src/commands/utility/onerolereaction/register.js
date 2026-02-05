const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('onerolereaction')
  .setDescription('Create exclusive reaction roles (only one role allowed)')
  .addStringOption(o =>
    o.setName('title')
      .setDescription('Embed title')
      .setRequired(true)
  )
  .addStringOption(o =>
    o.setName('roles')
      .setDescription('Mention roles like: @Red @Blue @Green (max 5)')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);
