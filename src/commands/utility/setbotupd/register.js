const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('setbotupd')
  .setDescription('Set where Fresh posts bot updates')
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('Channel for updates')
      .setRequired(true)
  )
  .addRoleOption(option =>
    option
      .setName('role')
      .setDescription('Role to ping')
      .setRequired(false)
  )
  .addStringOption(option =>
    option
      .setName('ping')
      .setDescription('Ping everyone/here')
      .addChoices(
        { name: 'None', value: 'none' },
        { name: '@everyone', value: 'everyone' },
        { name: '@here', value: 'here' }
      )
      .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
