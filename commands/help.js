const Discord = require('discord.js');
const package = require('../package.json')
const config = require('../config.json')

exports.run = (bot, message, args) => {
    let embed = new Discord.RichEmbed() //info embed on ticket
        .setTitle("Help Menu")
        .setColor(config.embedcolor)
        .setDescription("**__Bot Commands__** | Prefix `" + config.prefix + "`\n\n__**General Commands**__\n\n**serverinfo** Check out some information about us\n**botinfo** View some information about the bot!\n**help** View this menu\n**ping** View Bot Latency\n**new** Order a service/product from me\n**vouch** Give a vouch!\n**suggest** Suggest anything you like\n\n__**Staff Commands**__\n\n**kick** Kicks a member from our discord server\n**ban** Bans a member from our server permenantly\n**prune** Prunes part of the chat\n**add** Adds a member to a ticket\n**revoke** Revokes a member from a ticket\n")
        .setFooter('Galaxy Designs', bot.user.displayAvatarURL)
        .setThumbnail(bot.user.displayAvatarURL)
      message.channel.send(embed)
}