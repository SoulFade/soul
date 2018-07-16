const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")

exports.run = (inv, message, args) => {
   const mention = message.mentions.members.first();
    const kiss = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(0x005500)
    .setImage("http://www.mobiletoones.com/downloads/wallpapers/love_wallpapers/preview/25/64432-kiss.jpg")
    message.channel.send(`${mention}` +  "**, you have been kissed by: ** " + message.author.username + " :heart:" );
    message.channel.send(kiss);
    mention.send("**You have been kissed by: **" + message.author.username + " in: " + message.guild.name);
}
