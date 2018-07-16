const Discord = require('discord.js');
const uptime = new Discord.RichEmbed()
exports.run = (inv, message, args) => {
		.setAuthor("Vell's Uptime", inv.user.avatarURL)
    .setDescription("Uptime of Vell Bot")
		.addField("Hours",Math.round(client.uptime / (1000 * 60 * 60)), true )
		.addField("Minutes", Math.round(client.uptime / (1000 * 60)) % 60, true);
    .setFooter(Vell is currently serving ${inv.users.size} users!`, message.author.avatarURL)
		message.channel.send(uptime)
    }
