const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('Lock the current channel')
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason')
      .setRequired(false));
