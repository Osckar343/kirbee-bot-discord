const fs = require('fs');

const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const { table } = require('console');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS","DIRECT_MESSAGES","DIRECT_MESSAGE_REACTIONS","DIRECT_MESSAGE_TYPING"] });


client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.buttons = new Discord.Collection();
//const buttonFolders = fs.readdirSync('./buttons');

client.on('ready', () => {
    client.user.setActivity("With your feelings", {
        type: "Playing",
      });

    console.log('Bot is ready as ' + client.user.tag);  
    console.log('ID Client: ' + client.user.id);
});

client.on('guildMemberAdd', async member => {

});


const someEmoji = client.emojis.cache.get("<:PurpleTeddy:913740742726410251>");

client.on('message', async (message) => {

  console.log('The user sent a message');
  console.log(`The message is: ${message.content}`);

  if(!message.content.startsWith(prefix) || message.author.bot) return; //If the message either doesn't start with the prefix or the author is a bot, exit early
  console.log('The message started with the prefix and it was not a bot');

  /*-----Getting command-----*/
  const args = message.content.slice(prefix.length).trim().split(/ +/);    
  const commandName = args.shift().toLowerCase(); 

  console.log(`The command name is: ${commandName}`);
  
  if (!client.commands.has(commandName)) return; //if command doesn't exists, exit early.

  console.log(`The command exists`);

  const command = client.commands.get(commandName);

  console.log(command);

  if (command.args && !args.length) { //If command has args but user doesn't provide them... send a warning and exit.

    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      reply += `\n\nFor example: \`${prefix}${command.name} ${command.usageExample}\``;
    }

    return message.channel.send(reply); //Exit
  }

  message.channel.send(someEmoji);

  command.execute(message, args);

});

client.login(token);