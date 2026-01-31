const cache = new Map();

function add(message) {

  const channelId = message.channel?.id;
  if (!channelId) return;

  if (!cache.has(channelId)) {
    cache.set(channelId, []);
  }

  cache.get(channelId).push({
    author: message.author?.tag || 'Unknown',
    content: message.content || '*empty*',
    time: Date.now()
  });

  // auto remove after 2 hours
  setTimeout(() => {
    const arr = cache.get(channelId);
    if (arr?.length) arr.shift();
  }, 2 * 60 * 60 * 1000);
}

function get(channelId) {
  return cache.get(channelId) || [];
}

module.exports = { add, get };
