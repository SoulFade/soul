
const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")

exports.run = (bot, message, args) => {
    message.delete();
    let say = args.slice(0).join(' ');
    let channel = message.guild.channels.find("name", "suggestions")
    if (!say) {
        message.reply(":x: Please add text!")
    return;

    } 
    let embed = new Discord.RichEmbed()
    .setTitle("Suggestion")
    .setThumbnail(message.author.icon)
    .setDescription(say)
    .setFooter("Suggestion By: " + message.author.username + " | Version: " + package.version)
    .setColor(config.embedcolor)
    channel.send(embed).then(async (m) => {
        try{
        await m.react('👍')
        await m.react('👎');
        }catch(e){
           console.log(e); 
          m.edit('Oops! One of the emojis failed to react!');
        }
    });
    message.reply("You suggestion was been posted. Thank you!")

}