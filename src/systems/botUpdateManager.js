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

  data[guildId] = {
    channel: channelId,
    ping: ping || null
  };

  save(data);
}

function getAll() {
  return load();
}

module.exports = {
  setConfig,
  getAll
};
