const discord = require('discord.js');
const config = require('../config.json')

exports.run = (bot, message, params) => {
    function getFormattedTime(date) {
        var seconds = Math.floor(date.getSeconds());
        var minutes = Math.floor(date.getMinutes());
        var hours = Math.floor(date.getHours());
        var formattedTime;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (minutes < 10 && hours >= 1) {
            minutes = `0${minutes}`;
        }
        formattedTime = (`${hours}:${minutes}:${seconds}`);

        return formattedTime;
    }

    var numberroles = message.guild.roles.map(role => role);
    var date = message.guild.createdAt;

    var ServerInformation = new discord.RichEmbed()
        .setAuthor(`Author: Demo#8439`, "https://cdn.discordapp.com/attachments/448175755705450497/448549634386821121/myAvatar_4.png")
        .setColor(config.embedcolor)
        .setTimestamp()
        .setDescription(`Server owner: ${message.guild.owner.user}\nServer owner ID: ${message.guild.ownerID}`)
        .addField(`Total members:`, message.guild.members.size, true)
        .addField(`Total roles:`, Array.from(numberroles).length, true)
        .addField(`Creation date:`, `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} | ${getFormattedTime(date)}`)
    message.channel.send(ServerInformation);
};

exports.conf = {
    name: 'serverinfo',
    aliases: ['srvinfo',],
    permLevel: 1,
    enabled: true,
    guildOnly: true
};