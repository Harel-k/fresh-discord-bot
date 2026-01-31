const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('setperms')
  .setDescription('Configure command permissions');
