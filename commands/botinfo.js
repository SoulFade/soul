const discord = require('discord.js');
const config = require('../config.json')

exports.run = (bot, message, params) => {

    var botinfo = new discord.RichEmbed()
        .setTitle(`Bot information`)
        .setAuthor(`Author: Demo#8439`, "https://cdn.discordapp.com/attachments/448175755705450497/448549634386821121/myAvatar_4.png")
        .setColor(config.embedcolor)
        .setTimestamp()
        .setFooter('Galaxy Designs', bot.user.displayAvatarURL)
        .setDescription(`Created in Node.js with the help of EramsorGR and Nigel\nMade by: Demo#8439`)
        .addField(`Bot serving in:`, `${bot.guilds.size} servers!`)
    message.channel.send(botinfo);
};


exports.conf = {
    name: 'botinfo',
    aliases: [`botinformation`],
    permLevel: 4,
    enabled: true,
    guildOnly: true
};