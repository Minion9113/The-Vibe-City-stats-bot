const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});

bot.login(config.token);

// Log stats-bot in to the server and set status
bot.on("ready", async () => {
console.log(`${bot.user.username} has logged on.`)
bot.user.setActivity('Members joining and leaving', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);

// Get our server
const guild = bot.guilds.get('619197704609988609');

// Get our stats channels
const totalUsers = bot.channels.get('945354051552444446');
const onlineUsers = bot.channels.get('945355793140707409');
const codeMonkeys = bot.channels.get('945360461988237372');

// Check every 30 seconds for changes
setInterval(function() {
  console.log('Getting stats update..')

  //Get actual counts
  var userCount = guild.memberCount;
  var onlineCount = guild.members.filter(m => m.presence.status === 'Online , dnd').size
  var coderCount = guild.roles.get('902426601814376448').members.size;
  
  // Log counts for debugging
  console.log("Total Users: " + userCount);
  console.log("Online Users: " + onlineCount);
  console.log("Staff: " + coderCount);

  // Set channel names
  totalUsers.setName("Total Users: " + userCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  onlineUsers.setName("Online Users: " + onlineCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  codeMonkeys.setName("Staff: " + coderCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);
  }, 30000)

});

bot.on('message', async message => {
  if(message.author.bot) return;

  let prefix = config.prefix;
  let messageBody = message.content.split(" ");
  let command = messageBody[0];


  if(command == `${prefix}code`){
    let repo = new Discord.RichEmbed()
    .setDescription("Stats Bot Repository")
    .setColor("#00FF00")
    .addField("Github", "https://github.com/Minion9113/The-Vibe-City-stats-bot https://github.com/Minion9113/The-Vibe-City-Utilities");
 

    return message.channel.send(repo);
  }
});



