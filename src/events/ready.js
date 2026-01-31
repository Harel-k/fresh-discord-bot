module.exports = {
  name: 'clientReady',
  once: true,

  execute(client) {
    console.log(`✅ Fresh is online as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: 'Fresh Bot | /help', type: 0 }],
      status: 'online'
    });
  }
};
