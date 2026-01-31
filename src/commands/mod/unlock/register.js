const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('unlock')
  .setDescription('Unlock the current channel')
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason')
      .setRequired(false));
