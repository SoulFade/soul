const Discord = require('discord.js');
const read = require('../storage3.json')
const package = require("../package.json")
const fs = require('fs');


exports.run = (bot, message, args) => {
  
  const ticketmsg = new Discord.RichEmbed()
  .setDescription("")
  
  let channelmsg = "Made your ticket at <#" + newChannel.id + ">"

  function newChannel() {
    return message.id;
  };

  message.react('🎉')

  let guild = message.guild

  read.number++;
  fs.writeFile("../storage3.json", JSON.stringify(read), (err) => console.error);
  args.shift()
  guild.createChannel('application' + '-' + read.number, "text")
    .then(newChannel => newChannel.overwritePermissions(message.author, {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.defaultRole, {VIEW_CHANNEL: false}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.roles.find("name", "Executives"), {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.overwritePermissions(message.guild.roles.find("name", "Management"), {VIEW_CHANNEL: true, SEND_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, MENTION_EVERYONE: true, USE_EXTERNAL_EMOJIS: true, ADD_REACTIONS: true, SEND_TTS_MESSAGE: true}))
    .then(newChannel => newChannel.setParent("436942577376296970"))
    .then(newChannel => newChannel.send(ticketmsg))
    /* .then(newChannel => setTimeout(() => {
                message.channel.send(channelmsg)
            }, 2500))*/
   
    let ticketLogs = message.guild.channels.find("name", "ticket-logs");
    let embed2 = new Discord.RichEmbed() //info embed on ticket
        .setTitle("Application Request")
        .setColor("10e61d")
        .setDescription("Application w/ ID `" + read.number + "` has been created by " + message.author.username)
        .setFooter(`Version ` + package.version)
    ticketLogs.send(embed2)
          
}