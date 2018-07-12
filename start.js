const Discord = require("discord.js");
const config = require("./config.json");
const package = require("./package.json");
const fs =require("fs");
const figlet = require('figlet');
const prefix = config.prefix;
const inv = new Discord.Client();
const talkedRecently = new Set();

inv.on('ready', () => {
  inv.user.setPresence({game:{name: `development`}}).catch(console.error);
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
      let embed1 = new Discord.RichEmbed()
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
    if (talkedRecently.has(message.author.id))
  return;

// Adds the user to the set so that they can't talk for 2.5 seconds
talkedRecently.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(message.author.id);
}, 2500);
});


inv.on("guildMemberAdd", member => {
    let wchan =  member.guild.channels.find("name", "welcome");
    let people = member.guild.memberCount - 4
  
    let embed = new Discord.RichEmbed() //info embed on ticket
       .setTitle("**Member Joined**")
       .setColor('GREEN')
 .setDescription("Welcome " + member + " to " + member.guild.name + "!\nMember count " + people)
 .setThumbnail(member.user.displayAvatarURL)
 .setFooter(`| Made by Alphi | ${member.guild.name}`, member.guild.iconURL)

    wchan.send(embed)
  });

inv.on("guildMemberRemove", member => {
  let wchan =  member.guild.channels.find("name", "welcome");
    let people = member.guild.memberCount - 4
  
    let embed = new Discord.RichEmbed() //info embed on ticket
       .setTitle("**Member Left**")
       .setColor('GREEN')
 .setDescription("Good bye" + member + " you will be missed! We now have \nMember count! `" + people + "`")
 .setThumbnail(member.user.displayAvatarURL)
 .setFooter('| Made By Alphi', member.guild.iconURL)
    wchan.send(embed)
  });

  inv.login(process.env.token); 
