const config = require("./config.json");
const package = require("./package.json");
const Discord = require('discord.js');
const fs =require("fs");
const figlet = require('figlet');
const prefix = config.prefix;
const bot = new Discord.Client();

//Logs of readyness
bot.on('ready', () => {
  bot.user.setPresence({game:{name: config.prefix + "help | V." + package.version ,type:1}}).catch(console.error);
  bot.user.setStatus("online").catch(console.error);

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
    figlet('ERAMSORGR', function(err, data) {
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
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
  });

bot.on("message", message => {
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
    commandFile.run(bot, message, args);
  } catch (err) {
    /*let embed2 = new Discord.RichEmbed() //info embed on ticket
        .setTitle("Error :x:")
        .setColor("db1212")
        .setDescription("Amino had an error :sob: \n```fix\n" + err + "```")
        .setFooter(`Version ` + package.version)
      message.channel.send(embed2) */
    console.error(err);
  }
});

bot.on("guildMemberAdd", member => {
    let wchan =  member.guild.channels.find("name", "welcome");
    let people = member.guild.memberCount - 4
  
    let embed = new Discord.RichEmbed() //info embed on ticket
       .setTitle("**Member Joined**")
       .setColor('GREEN')
 .setDescription("Welcome " + member + " to " + member.guild.name + "!\nMember count " + people)
 .setThumbnail(member.user.displayAvatarURL)
 .setFooter(`| Made by Demo | ${member.guild.name}`, member.guild.iconURL)

    wchan.send(embed)
  });

bot.on("guildMemberRemove", member => {
  let wchan =  member.guild.channels.find("name", "welcome");
    let people = member.guild.memberCount - 4
  
    let embed = new Discord.RichEmbed() //info embed on ticket
       .setTitle("**Member Left**")
       .setColor('GREEN')
 .setDescription("Good bye" + member + " you will be missed! We now have \nMember count! `" + people + "`")
 .setThumbnail(member.user.displayAvatarURL)
 .setFooter('| Made By Demo', member.guild.iconURL)
    wchan.send(embed)
  });

  bot.login(config.token); // You can find the bot token at the config.json file.