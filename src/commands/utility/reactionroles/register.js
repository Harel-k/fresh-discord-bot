const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('reactionroles')
  .setDescription('Create a reaction role message')
  .addStringOption(o =>
    o.setName('title')
      .setDescription('Embed title')
      .setRequired(true)
  )
  .addStringOption(o =>
    o.setName('roles')
      .setDescription('Format: @Role1,@Role2,@Role3 (max 5)')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);
