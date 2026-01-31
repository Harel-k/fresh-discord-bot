const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('unban')
  .setDescription('Unban a user')
  .addStringOption(o =>
    o.setName('userid')
      .setDescription('User ID')
      .setRequired(true))
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason')
      .setRequired(false));
