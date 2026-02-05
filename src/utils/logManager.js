const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'logs.json');

function read() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
  return JSON.parse(fs.readFileSync(filePath));
}

function write(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function setChannel(guildId, channelId) {
  const data = read();
  data[guildId] = { channel: channelId };
  write(data);
}

function getChannel(guildId) {
  const data = read();
  return data[guildId]?.channel || null;
}

module.exports = { setChannel, getChannel };
