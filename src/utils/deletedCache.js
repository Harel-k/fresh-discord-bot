const cache = new Map();

function add(message) {
  if (!message.guild || message.author?.bot) return;

  if (!cache.has(message.channel.id)) {
    cache.set(message.channel.id, []);
  }

  cache.get(message.channel.id).push({
    author: message.author.tag,
    content: message.content || '*empty*',
    time: Date.now()
  });

  setTimeout(() => {
    const arr = cache.get(message.channel.id);
    if (arr) arr.shift();
  }, 2 * 60 * 60 * 1000);
}

function get(channelId) {
  return cache.get(channelId);
}

module.exports = { add, get };
