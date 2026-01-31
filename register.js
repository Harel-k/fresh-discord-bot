require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

const base = path.join(__dirname, 'src', 'commands');

console.log('📂 Reading commands from:', base);

const categories = fs.readdirSync(base);

for (const category of categories) {
  const categoryPath = path.join(base, category);

  console.log('➡ Category:', category);

  const folders = fs.readdirSync(categoryPath);

  for (const folder of folders) {
    const registerPath = path.join(categoryPath, folder, 'register.js');

    console.log('   ↳ Loading:', registerPath);

    const register = require(registerPath);

    commands.push(register.toJSON());
  }
}

console.log('✅ Found commands:', commands.length);

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log('✅ Registered successfully');
})();
