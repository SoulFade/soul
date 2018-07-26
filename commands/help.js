const Discord = require('discord.js');
const package = require('../package.json')
const config = require('../config.json')

exports.run = (inv, message, args) => {
    let embed = new Discord.RichEmbed()
            .addField('Vell\'s Commands', 'Help Menu')
            .addField('google', 'Googles what you ask for.')
            .addField('dict', 'Defines what you search for.')
            .addField('status', 'displays the server status for AQ3D game.')
            .addField('Admin Commands', 'Mute - Ban - Kick - Prune')
            .addField('Servers', 'Displays amount of servers the bot is in.')
            .addField('Users', 'Displays amount of users for bot.')
            .addField("Music", "Usage: ?mhelp")
            .addField("Info", "DMs bot's info (BETA)")
            .addField("Fun", "?bann, sends a fake message of tagged user being banned")
            .addField("8ball", "Asks a question to 8ball, usage: ?8ball am I cool?")
            .setColor(`0x550055`)
            .addField("Server Info", "?serverinfo")
            .addField("Kiss", "Sends an image, a text message and a DM to the mentioned user!")
            .addField("Hug", "Sends an image, a text message and a DM to the mentioned user!")
            .addField("Memory", "?memory, displays the bot's memory usage")
            .addField("Weather", "?weather location, displays selected location's weather")
            .addField("Features", "More features are being added!!")
            .setThumbnail(message.author.avatarURL)
            .setFooter("Server: " + `${message.guild.name}`, message.guild.iconURL);
               message.author.send({ embed });
        let cembed = new Discord.RichEmbed()
            .addField("Please check your DM's 👌", "Help is on its way...")
            .setColor(`0x550055`)
            .setFooter("Server: " + `${message.guild.name}`, message.guild.iconURL);
              message.channel.send({ embed: cembed });
  }
