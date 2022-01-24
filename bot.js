const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const discord = require("discord.js")
const client = new discord.Client({ disableEveryone: true });
const { readdirSync } = require("fs");
const { join } = require("path");
const config = require("./config.json");


client.on("ready", () => {

  client.user.setActivity(config.PREFIX+" - " + client.users.cache.size + " user and " + client.guilds.cache.size + " server", { type: "STREAMING", url: "https://twitch.tv/rootcf" })

  console.log('Online!');
});
client.on("warn", info => console.log(info));

client.on("error", console.error)

client.commands = new discord.Collection()
client.alias = new Collection()
client.prefix = config.PREFIX
client.queue = new Map();

const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  let pull = require(`./commands/${file}`);
  console.log(`Loading Command -> ${pull.name}`);
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)

  command.alias.forEach(alias => client.alias.set(alias, command))


}

client.on("message", async message => {

  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(config.PREFIX)) {

    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.alias.has(command)) {
      return;
    }

    try {
      if (client.commands.has(command))
        client.commands.get(command).execute(client, message, args)
      else
        client.alias.get(command).execute(client, message, args)






    } catch (err) {
      console.log(err)
      message.reply("Something happened!")
    }

  }

});

client.login(config.TOKEN)
