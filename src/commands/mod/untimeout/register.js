const { SlashCommandBuilder } = require('discord.js');

module.exports = new SlashCommandBuilder()
  .setName('untimeout')
  .setDescription('Remove timeout from a member')
  .addUserOption(o =>
    o.setName('user')
      .setDescription('User')
      .setRequired(true))
  .addStringOption(o =>
    o.setName('reason')
      .setDescription('Reason')
      .setRequired(false));
