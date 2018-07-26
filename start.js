const config = require("./config.json");
const package = require("./package.json");
const Discord = require('discord.js');
const fs =require("fs");
const figlet = require('figlet');
const prefix = config.prefix;
const inv = new Discord.Client();
inv.commands = new Discord.Collection();
inv.aliases = new Discord.Collection();
inv.playlists = new Discord.Collection();
//Logs of readyness
inv.on('ready', () => {
  inv.user.setPresence({game:{name: config.prefix + "help | V." + package.version ,type:1}}).catch(console.error);
  inv.user.setStatus("online").catch(console.error);

  figlet('GD', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log("")
    console.log("")
    console.log("Core by")
    figlet('Alphi', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
        figlet('==========', function(err, data) {
          if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
          }
          console.log(data)
        });
      });
    });
});


//cmd handler
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      inv.on(eventName, (...args) => eventFunction.run(inv, ...args));
    });
  });

inv.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    if (message.channel.type === "dm") {
      let embed1 = new Discord.RichEmbed() //info embed on ticket
        .setTitle("Error :x:")
        .setColor("db1212")
        .setDescription("DM Commands are not allowed!")
        .setFooter(`Version ` + package.version)
      message.channel.send(embed1)
      return;
  }
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(inv, message, args);
  } catch (err) {

    console.error(err);
  }
});



  inv.login(process.env.token);
