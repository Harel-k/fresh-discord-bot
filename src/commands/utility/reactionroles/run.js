const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  name: 'reactionroles',

  async run(interaction) {

    const title = interaction.options.getString('title');
    const roleInput = interaction.options.getString('roles');

    const roles = roleInput.split(',').slice(0, 5);

    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setTitle(title)
      .setDescription('Click buttons to toggle roles');

    const row = new ActionRowBuilder();

    for (const roleMention of roles) {

      const roleId = roleMention.replace(/[<@&>]/g, '');
      const role = interaction.guild.roles.cache.get(roleId);

      if (!role) continue;

      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`rr_${role.id}`)
          .setLabel(role.name)
          .setStyle(ButtonStyle.Secondary)
      );
    }

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
