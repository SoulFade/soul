const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")

exports.run = (bot, message, args) => {
    const margs = message.content.split(' ');
    let amount = margs[1]
    let reason = args.slice(2).join(' ');

    if(!amount) {
    message.reply("Add an amount");
    return;
    }
    let embed = new Discord.RichEmbed()
        .setDescription("https://paypal.me/AzizDesigns/" + amount + "/")
        .setColor(config.embedcolor)
        .setFooter('Galaxy Designs', bot.user.displayAvatarURL)
        message.channel.send(embed)
}