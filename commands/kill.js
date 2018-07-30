const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")
exports.run = (inv, message, args) => {
   const rando_imgs = [
'https://giphy.com/gifs/monday-the-it-crowd-workplace-c6DIpCp1922KQ',
'https://giphy.com/gifs/barney-stinson-neil-patrick-harris-suicide-jSxK33dwEMbkY ',
'https://giphy.com/gifs/barney-stinson-neil-patrick-harris-suicide-jSxK33dwEMbkY ',
]
 const mention = message.mentions.members.first();
 const kill = new Discord.RichEmbed()
 .setTimestamp()
 .setColor("#ff0000")
 .setImage(rando_imgs[Math.floor(Math.random() * rando_imgs.length)])
 .setFooter("Sent by: " + message.author.username)
 message.channel.send(mention + " you have been killed by: " + message.author.username + " :heart:")
 message.channel.send(kill)
 mention.send("You were hugged by: " + message.author.username + " in " + `${message.guild.name}`)

}
