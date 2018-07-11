
const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")
exports.run = (bot, message, args) => {
    let say = args.slice(0).join(' ');
    let channel = message.guild.channels.find("name", "vouches")
    message.delete()
    if (!say) {
        message.reply("Remember you can add text to your vouch! We still posted your vouch.")
    let embed = new Discord.RichEmbed()
    .setTitle("Vouch! :thumbsup: ")
    .setThumbnail(message.author.icon)
    .setFooter("Vouch by: " + message.author.username + " | Version: " + 'Galaxy Designs', bot.user.displayAvatarURL)
    .setColor(config.embedcolor)
    channel.send(embed)
    return;

    } 
    let embed = new Discord.RichEmbed()
    .setTitle("Vouch! :thumbsup: ")
    .setThumbnail(message.author.icon)
    .setDescription(say)
    .setFooter("Vouch by: " + message.author.username + " | " + 'Galaxy Designs', bot.user.displayAvatarURL)
    .setColor(config.embedcolor)
    channel.send(embed)
    message.reply("You vouch was been posted. Thank you!")

}