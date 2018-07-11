const Discord = require('discord.js');
const read = require('../storage.json')
const comms = require('../storage2.json')
const config = require ('../config.json')
const fs = require('fs')

exports.run = (client, message, args) => {

    let support = message.guild.roles.find("name", "Support Team");
    let executive = message.guild.roles.find("name", "CEO");
    let management = message.guild.roles.find('name', 'Management');
    let salesrep = message.guild.roles.find('name', 'Sales Representative');
    let aminoteam = message.guild.roles.find("name", "Amino Team");

let array = [support.id, executive.id, management.id, salesrep.id, aminoteam,id];

    if (!array) {
        message.channel.send(new Discord.RichEmbed().setColor(config.embedcolor).setDescription('You are missing permission.'))
        return
    }
    const ch = message.guild.channels.find('name', `ticket-${args[0]}`) || message.guild.channels.find('name', `commission-${args[0]}`)
    try {
        ch.overwritePermissions(message.member, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        message.channel.send(new Discord.RichEmbed().setColor(config.embedcolor).setDescription(`You have joined Ticket/Commission with ID \`${args[0]}\`.`))
    } catch (err) {
        message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setDescription('Invalid ID.'))
    }
};