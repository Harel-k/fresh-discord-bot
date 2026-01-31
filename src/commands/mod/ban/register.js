const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Ban a member')
  .addUserOption(o =>
    o.setName('user')
      .setDescription('User to ban')
      .setRequired(true))
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason for ban')
      .setRequired(false));
