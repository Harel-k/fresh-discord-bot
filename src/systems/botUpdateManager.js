const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'botupdates.json');

function load() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
  return JSON.parse(fs.readFileSync(filePath));
}

function save(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function setConfig(guildId, channelId, ping) {
  const data = load();

  if (!data[guildId]) data[guildId] = {};

  data[guildId].channel = channelId;
  data[guildId].ping = ping || null;

  save(data);
}

function setLastMessage(guildId, messageId) {
  const data = load();

  if (!data[guildId]) data[guildId] = {};
  data[guildId].lastMessage = messageId;

  save(data);
}

function getConfig(guildId) {
  const data = load();
  return data[guildId];
}

function getAll() {
  return load();
}

module.exports = {
  setConfig,
  setLastMessage,
  getConfig,
  getAll
};
