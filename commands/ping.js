const Discord = require('discord.js')
module.exports = {
  name: "ping", 
  description: "Shows bot's ping",
  alias : [""],
  execute(client, message, args) {
    message.reply(`**Pong!** ${client.ws.ping}ms`);
}
};

