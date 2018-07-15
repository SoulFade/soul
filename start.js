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
  const prefixMention = new RegExp(`^<@!?${inv.user.id}> `);
    const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : '?';
  const command = args.shift().toLowerCase();

});
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
inv.on("guildMemberAdd", async member => {
    let wchan =  member.guild.channels.find("name", "welcome");
    let people = member.guild.memberCount - 4
  
    let embed = new Discord.RichEmbed() //info embed on ticket
       .setTitle("**Member Joined**")
       .setColor('GREEN')
 .setDescription("Welcome " + member + " to " + member.guild.name + "!\nMember count " + people)
 .setThumbnail(member.user.displayAvatarURL)
 .setFooter(`| Made by Inv Technologies | ${member.guild.name}`, member.guild.iconURL)
    wchan.send({embed})
    wchan.send(`Hi ${member.toString()}! Please respond with 'agree' to access the server.`);
    let response =  await wchan.awaitMessages(mg => {
        return mg.author.id === member.id;
    }, {max: 1})
    response = response.array()[0];

 if (response.content.toLowerCase() === "agree"){
        let role = member.guild.roles.find(role => {return role.id==="466316850737709057"});
        member.addRole(role);
        wchan.send("You now have access to the server, enjoy!!");
    }
    else{
        wchan.send("You did not meet the requirements, please contact an admin or try again.");
    }
  });
//hey
inv.on("guildMemberRemove", member => {
  let wchan =  member.guild.channels.find("name", "welcome");
    let people = member.guild.memberCount   
    let embed = new Discord.RichEmbed() //info embed on ticket
       .setTitle("**Member Left**")
       .setColor('GREEN')
       .setDescription("Good bye" + member + " you will be missed! We now have \nMember count! `" + people + "`")
       .setThumbnail(member.user.displayAvatarURL)
        .setFooter('| Made By Inv Technologies', member.guild.iconURL)
         wchan.send(embed)
  })
inv.login(process.env.token); 
