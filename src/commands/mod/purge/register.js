const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Delete messages')
  .addIntegerOption(o =>
    o.setName('amount')
      .setDescription('Number of messages (1–100)')
      .setRequired(true))
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason')
      .setRequired(false));
