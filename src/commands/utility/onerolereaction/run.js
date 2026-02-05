const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  name: 'onerolereaction',

  async run(interaction) {

    await interaction.deferReply({ ephemeral: true });

    const title = interaction.options.getString('title');
    const roleInput = interaction.options.getString('roles');

    // extract role IDs
    const roleIds = [...roleInput.matchAll(/<@&(\d+)>/g)]
      .map(m => m[1])
      .slice(0, 5);

    if (roleIds.length === 0) {
      return interaction.editReply('❌ Please mention valid roles.');
    }

    const embed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle(title)
      .setDescription('You may select **only ONE** role.');

    const row = new ActionRowBuilder();

    for (const roleId of roleIds) {

      const role = interaction.guild.roles.cache.get(roleId);
      if (!role) continue;

      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`orr_${role.id}_${roleIds.join('-')}`)
          .setLabel(role.name)
          .setStyle(ButtonStyle.Primary)
      );
    }

    await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.editReply('✅ One-role reaction panel created.');
  }
};
