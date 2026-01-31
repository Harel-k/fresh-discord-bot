module.exports = {
  name: 'unlock',
  defaultPerms: ['ManageChannels'],

  async run(interaction) {

    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.channel.permissionOverwrites.edit(
      interaction.guild.roles.everyone,
      { SendMessages: null }
    );

    await interaction.reply(`🔓 Channel unlocked\n📝 Reason: ${reason}`);
  }
};
