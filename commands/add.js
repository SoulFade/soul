const Discord = require('discord.js');
const read = require('../storage.json')
const package2 = require("../package.json")
const fs = require('fs');


exports.run = (inv, message, args) => {               
    if(message.channel.parent.id === '345') {
        if(message.member.roles.has("345")) {

        let member = message.mentions.members.first();      
        let memaddembed = new Discord.RichEmbed()
        .setColor(0x9167FF)
        .setDescription(member + " has now access to this channel.")
        .setFooter('Vell Pro', inv.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(memaddembed);
        message.channel.overwritePermissions(member, {
            SEND_MESSAGES: true, VIEW_CHANNEL: true
        })
                                    
        } else {
            message.channel.send(":x: | You are not allowed to run this command!")
        }       
    } else {
            message.channel.send("Command can only be used in ticket channels.");
    }
}
