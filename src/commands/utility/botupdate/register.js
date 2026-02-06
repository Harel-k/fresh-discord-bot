const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('botupdate')
  .setDescription('Broadcast update to all servers')
  .addStringOption(option =>
    option
      .setName('message')
      .setDescription('Update message')
      .setRequired(true)
  )
  .addBooleanOption(option =>
    option
      .setName('ping')
      .setDescription('Ping configured role/everyone?')
      .setRequired(false)
  );
