const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'logs.json');

function load() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
  return JSON.parse(fs.readFileSync(filePath));
}

function save(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function setChannel(guildId, channelId) {
  const data = load();
  if (!data[guildId]) data[guildId] = {};
  data[guildId].channel = channelId;
  save(data);
}

function toggleDeleted(guildId) {
  const data = load();
  if (!data[guildId]) data[guildId] = {};
  data[guildId].deleted = !data[guildId].deleted;
  save(data);
  return data[guildId].deleted;
}

function get(guildId) {
  const data = load();
  return data[guildId];
}

module.exports = {
  setChannel,
  toggleDeleted,
  get
};
