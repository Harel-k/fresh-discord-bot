const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('gend')
  .setDescription('Force end a giveaway')
  .addStringOption(o =>
    o.setName('messageid')
      .setDescription('Giveaway message ID')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
