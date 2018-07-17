const config = require("./config.json");
const package = require("./package.json");
const Discord = require('discord.js');
const fs =require("fs");
const figlet = require('figlet');
const prefix = config.prefix;
const inv = new Discord.Client();

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
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
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

inv.on("guildMemberAdd", async member => {
    let wchan =  member.guild.channels.find("name", "welcome");
   wchan.send(`Welcome to Army of Morons ${member.toString()}! :hype: please take some time to read our <#465951736155340820> channel :sippy: and when you're done type 'agree' to unlock the rest of the server!  `);
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

  inv.login(process.env.token);
