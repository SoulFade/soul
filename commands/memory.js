const Discord = require('discord.js')

exports.run(inv, message, args) => {
    let memory =  (process.memoryUsage().heapUsed/1024/1024).toFixed(2) + " MB "
    const mem = new Discord.RichEmbed()
    .setAuthor("Vell's Memory Usage", inv.user.avatarURL)
    .setColor(`0x005500`)
    .setThumbnail(message.author.avatarURL)
    .addField("Memory", memory)
    .setTimestamp()
    .setFooter("Requested by: " + message.author.username)
    message.channel.send(mem);
    }
