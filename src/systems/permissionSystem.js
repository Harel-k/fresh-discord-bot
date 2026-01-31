const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'config', 'permissions.json');

function load() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '{}');
  return JSON.parse(fs.readFileSync(file));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getAllowedRoles(commandName) {
  const data = load();
  return data[commandName] || [];
}

function setAllowedRoles(commandName, roles) {
  const data = load();
  data[commandName] = roles;
  save(data);
}

module.exports = {
  getAllowedRoles,
  setAllowedRoles
};
