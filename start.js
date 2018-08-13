const config = require("./config.json");
const package = require("./package.json");
const Discord = require('discord.js');
const sql = require("sqlite");
sql.open("./score.sqlite");
const fs = require("fs");
const figlet = require('figlet');
const prefix = config.prefix;
const inv = new Discord.Client();
inv.commands = new Discord.Collection();
inv.aliases = new Discord.Collection();
inv.playlists = new Discord.Collection();
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');
const defaultSettings = {
  prefix: "?",
  modLogChannel: "logs",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeChannel: "welcome",
  welcomeMessage: "Welcome {{user}} to the server! Emjoy your stay!! :3"
}
inv.on('guildMemberAdd', async member => {
  let channel = inv.channels.get("478411912892252166") //ez nou
  channel.send(`:Karma: What goes around, must come back around. :Karma: \n Hey!  ${member.toString()} Welcome to Karma. Please read <#335251583233294346>. \n Karma is now recruiting for dedicated players to blow through the game. Help us grow stronger and your karma will be served. \n May your blade run red with the blood of our enemies \n Please type *agree* in <#478411912892252166>`)
  


        return mg.author.id === member.id;
    }, {max: 1})
    response = response.array()[0];

 if (response.content.toLowerCase() === "agree"){
        let role = member.guild.roles.find(role => {return role.id==="473723745471692801"});
        member.addRole(role);
        welcome.send("You now have access to the server, welcome to Karma <:hype:468081845787951106> and most importantly, enjoy your stay!!");
    }
    else{
        welcome.send("You did not meet the requirements, please contact an admin or try again.");
    }
  });
inv.on("guildCreate", guild => {
  inv.settings.set(guild.id, defaultSettings);
});

inv.on("guildDelete", guild => {
  // Removing an element uses `delete(key)`
  inv.settings.delete(guild.id);
});

inv.on("guildMemberAdd", member => {
  let welcomeMessage = inv.settings.get(member.guild.id, "welcomeMessage");
  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)
  
  // we'll send to the welcome channel.
  member.guild.channels
    .find("name", inv.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
});
inv.on("ready", async () => {
  // We need to ensure that every single guild has a configuration when we boot. 
  // First loop through all guilds
  inv.guilds.forEach(guild => {
    // For this guild, check if enmap has its guild conf
    if(!inv.settings.has(guild.id)) {
       // add it if it's not there, add it!
       inv.settings.set(guild.id, defaultSettings);
    }
  });
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

inv.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const guildConf = inv.settings.get(message.guild.id) || defaultSettings;
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

        const responseObject = {
            "ayy": "Ayy, lmao!",
            "wat": "Say what?",
            "lol": "lol indeed",
            "odii": "is nub"
        };
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(inv, message, args);
    } catch (err) {

        console.error(err);
    }
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        } else {
            let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
            if (curLevel > row.level) {
                row.level = curLevel;
                sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
                message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
            }
            sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        });
    });

    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + "level")) {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("Your current level is 0");
            message.reply(`Your current level is ${row.level}`);
        });
    } else

    if (message.content.startsWith(prefix + "points")) {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("Sadly you do not have any points yet! :slight_frown:");
            message.reply(`You currently have ${row.points} points, good going!`);
        });
    }

if (command === 'setconfig') {
  const adminRole = message.guild.roles.find("name", guildConf.adminRole);
    if(!adminRole) return message.reply("Administrator Role Not Found");
    
    // Then we'll exit if the user is not admin
    if(!message.member.roles.has(adminRole.id)) return message.reply("You're not an admin, sorry!")
    
    // Let's get our key and value from the arguments. This is array destructuring, by the way. 
    const [key, ...value] = args;
    // Example: 
    // key: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)
    
    // We can check that the key exists to avoid having multiple useless, unused keys in the config:
    if(!inv.settings.has(message.guild.id, key))  return message.reply("This key is not in the configuration.");
    
    // Now we can finally change the value. Here we only have strings for values so we won't
    // bother trying to make sure it's the right type and such. 
    inv.settings.set(message.guild.id, value.join(" "), key);
    
    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item ${key} has been changed to:\n\`${value.join(" ")}\``);
  
}
  if(command === "showconf") {
    let configKeys = "";
    Object.keys(guildConf).forEach(key => {
      configKeys += `${key}  :  ${guildConf[key]}\n`;
    });
    message.channel.send(`The following are the server's current configuration: \`\`\`${configKeys}\`\`\``);
  }
  
});



inv.login(config.token);
