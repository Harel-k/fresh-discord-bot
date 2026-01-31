const deleteCache = require('../utils/deleteCache');

module.exports = {
  name: 'messageDelete',

  async execute(message) {

    try {

      // fetch partials safely
      if (message.partial) {
        await message.fetch().catch(() => {});
      }

      if (!message.guild || message.author?.bot) return;

      console.log('DELETED:', message.content);

      deleteCache.add(message);

    } catch (err) {
      console.error('delete event error:', err);
    }
  }
};
