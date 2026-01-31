require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  console.log('🧹 Clearing guild commands...');

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: [] }
  );

  console.log('🧹 Clearing global commands...');

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: [] }
  );

  console.log('✅ All commands cleared');
})();
