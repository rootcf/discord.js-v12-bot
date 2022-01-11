const Discord = require('discord.js')
module.exports = {
  name: "ping", 
  description: "Botun pingini gösterir",
  alias : [""],
  execute(client, message, args) {
    
    message.reply(`**Pong!** ${client.ws.ping}ms`);
    
}
};

