const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('botupdateedit')
  .setDescription('Edit the last bot update')
  .addStringOption(option =>
    option
      .setName('message')
      .setDescription('New message')
      .setRequired(true)
  );
