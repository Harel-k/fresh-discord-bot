const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'giveaways.json');

function load() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
  return JSON.parse(fs.readFileSync(filePath));
}

function save(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function create(guildId, giveaway) {
  const data = load();
  if (!data[guildId]) data[guildId] = [];
  data[guildId].push(giveaway);
  save(data);
}

function getAll() {
  return load();
}

module.exports = {
  create,
  getAll
};
