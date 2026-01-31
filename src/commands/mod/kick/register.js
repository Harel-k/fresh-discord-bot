const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kick a member')
  .addUserOption(o =>
    o.setName('user')
      .setDescription('User to kick')
      .setRequired(true))
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason')
      .setRequired(false));
