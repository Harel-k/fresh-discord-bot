const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const base = path.join(__dirname, '..', 'commands');

  const categories = fs.readdirSync(base);

  for (const category of categories) {
    const categoryPath = path.join(base, category);

    const folders = fs.readdirSync(categoryPath);

    for (const folder of folders) {
      const command = require(path.join(categoryPath, folder, 'run.js'));

      client.commands.set(command.name, command);
    }
  }

  console.log(`✅ Loaded ${client.commands.size} commands`);
};
