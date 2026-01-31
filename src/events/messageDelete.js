const cache = require('../utils/deleteCache');

module.exports = {
  name: 'messageDelete',

  async execute(message) {
    cache.add(message);
  }
};
