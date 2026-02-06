const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');
const sendLog = require('../../../utils/sendLog');

module.exports = {
  name: 'reactionroles',

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const title = interaction.options.getString('title');
    const roleInput = interaction.options.getString('roles');

    // Extract role IDs from mentions like <@&123>
    const roleIds = [...roleInput.matchAll(/<@&(\d+)>/g)].map(m => m[1]).slice(0, 5);

    if (roleIds.length === 0) {
      return interaction.editReply('❌ Please mention roles like: @Role1, @Role2 (max 5).');
    }

    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle(title)
      .setDescription('Click the buttons to toggle roles.');

    const row = new ActionRowBuilder();

    for (const roleId of roleIds) {
      const role = interaction.guild.roles.cache.get(roleId);
      if (!role) continue;

      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`rr_${role.id}`)
          .setLabel(role.name)
          .setStyle(ButtonStyle.Secondary)
      );
    }

    if (row.components.length === 0) {
      return interaction.editReply('❌ None of those roles were found.');
    }

    // Send the panel to the channel, keep the command response private
    await interaction.channel.send({ embeds: [embed], components: [row] });

    await sendLog(
        interaction.guild,
        'Reaction Role Panel Created',
        `**Title:** ${title}
        **Roles:** ${roleInput}
        **Channel:** <#${interaction.channel.id}>
        **Created by:** ${interaction.user.tag}`
    );


    return interaction.editReply('✅ Reaction roles panel created in this channel.');
  }
};
