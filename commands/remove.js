const Discord = require('discord.js');
const read = require('../storage.json');
const config = require('../config.json');
const package2 = require("../package.json");
const fs = require('fs');


exports.run = (bot, message, args) => {
    if(message.channel.parent.id === '448193459346604042') {
        if(message.member.roles.has("448199275781029898")) {

        let member = message.mentions.members.first();      
        let memaddembed = new Discord.RichEmbed()
        .setColor(config.embedcolor)
        .setDescription(member + " is removed from this channel.")
        .setFooter('Galaxy Designs', message.guild.iconURL)
        .setTimestamp()
        message.channel.send(memaddembed);
        message.channel.overwritePermissions(member, {
            SEND_MESSAGES: false, VIEW_CHANNEL: false
        })
                                    
        } else {
            message.channel.send(":x: | You are not allowed to run this command!")
        }       
    } else {
        message.channel.send("Command can only be used in ticket channels.");
    }
}