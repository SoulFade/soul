const Discord = require('discord.js');
const read = require('../storage.json')
const package = require("../package.json")
const fs = require('fs');


exports.run = (bot, message, args) => {
  
  let ticketmsg = "Hello there, <@" + message.author.id + ">!\n :information_source: Please describe your issue. If you made this by mistake please inform the staff members."
  let channelmsg = "Made your ticket at <#" + newChannel.id + ">"

  function newChannel() {
    return message.id;
  };

  message.react('✅')

  let guild = message.guild

  read.number++;
  fs.writeFile("./storage.json", JSON.stringify(read), (err) => console.error);
  args.shift()
  guild.createChannel('ticket' + '-' + read.number, "text")
    .then(newChannel => newChannel.overwritePermissions(message.author, {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.defaultRole, {VIEW_CHANNEL: false}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.roles.find("name", "Founder"), {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.roles.find("name", "Admin"), {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.roles.find("name", "Moderator"), {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.setParent("448193459346604042"))

    .then(newChannel => newChannel.send(ticketmsg))
    /* .then(newChannel => setTimeout(() => {
                message.channel.send(channelmsg)
            }, 2500))*/
   
    let ticketLogs = message.guild.channels.find("name", "ticket-logs");
    let embed2 = new Discord.RichEmbed() //info embed on ticket
        .setTitle("Creation")
        .setColor("10e61d")
        .setDescription("Ticket `" + read.number + "` has been created by " + message.author.username)
        .setFooter('Galaxy Designs', bot.user.displayAvatarURL)
    ticketLogs.send(embed2)
          
}