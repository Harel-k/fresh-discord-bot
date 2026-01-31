module.exports = {
  name: 'lock',
  defaultPerms: ['ManageChannels'],

  async run(interaction) {

    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.channel.permissionOverwrites.edit(
      interaction.guild.roles.everyone,
      { SendMessages: false }
    );

    await interaction.reply(`🔒 Channel locked\n📝 Reason: ${reason}`);
  }
};
