const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',

  async run(interaction) {

    const base = path.join(__dirname, '..', '..'); // commands folder
    const categories = fs.readdirSync(base);

    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setTitle('🌿 Fresh Commands')
      .setDescription('Here are all available commands:\n');

    for (const category of categories) {

      const categoryPath = path.join(base, category);
      const folders = fs.readdirSync(categoryPath);

      let commandList = '';

      for (const folder of folders) {

        const register = require(path.join(categoryPath, folder, 'register.js'));
        const runFile = require(path.join(categoryPath, folder, 'run.js'));

        // ✅ hide owner/system commands (like /setperms)
        if (runFile.ownerOnly) continue;

        commandList += `• \`/${register.name}\` — ${register.description}\n`;
      }

      if (commandList.length > 0) {
        embed.addFields({
          name: `📁 ${category}`,
          value: commandList,
          inline: false
        });
      }
    }

    await interaction.reply({ embeds: [embed] });
  }
};
