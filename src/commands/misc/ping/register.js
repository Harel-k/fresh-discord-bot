const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');
