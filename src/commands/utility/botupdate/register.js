const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('botupdate')
  .setDescription('Broadcast update to ALL servers')
  .addStringOption(option =>
    option
      .setName('message')
      .setDescription('Update message')
      .setRequired(true)
  );
