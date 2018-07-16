const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")
let image = Math.floor((Math.random() * images.length))
let images = "../kiss_images"
exports.run = (inv, message, args) => {
   const mention = message.mentions.members.first();
    const kiss = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(0x005500)
    .setImage(images[image])
    message.channel.send(`${mention}` +  "**, you have been kissed by: ** " + message.author.username + " :heart:" );
    message.channel.send(kiss);
    mention.send("**You have been kissed by: **" + message.author.username + " in: " + message.guild.name);
   
let image = Math.floor((Math.random() * images.length))


}
