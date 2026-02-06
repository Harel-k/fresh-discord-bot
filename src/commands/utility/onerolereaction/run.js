const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');
const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'onerolereaction',

  async run(interaction) {

    await interaction.deferReply({ ephemeral: true });

    const title = interaction.options.getString('title');
    const roleInput = interaction.options.getString('roles');

    const roleIds = [...roleInput.matchAll(/<@&(\d+)>/g)]
      .map(m => m[1])
      .slice(0, 5);

    if (!roleIds.length) {
      return interaction.editReply('❌ Please mention roles like @Role.');
    }

    const embed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle(title)
      .setDescription('Select **one** role only.');

    const row = new ActionRowBuilder();

    // Store all role IDs inside ONE string
    const roleString = roleIds.join(',');

    for (const id of roleIds) {
      const role = interaction.guild.roles.cache.get(id);
      if (!role) continue;

      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`orr|${id}|${roleString}`)
          .setLabel(role.name)
          .setStyle(ButtonStyle.Primary)
      );
    }

    await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

    await sendLog(
        interaction.guild,
        'One Role Reaction Panel Created',
        `Title: ${title}\nRoles: ${roleInput}\nChannel: ${interaction.channel}\nAdministrator: ${interaction.user.tag}`
    );

    await interaction.editReply('✅ Panel created.');
  }
};
