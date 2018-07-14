const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")

exports.run = (inv, message, args) => {
   const mention = message.mentions.members.first();
   await message.channel.send(`${mention} **has been banned from the server!**`);
   await message.channel.send(`${mention} **has left the server!**`);
   await mention.send("**You have been banned from the server!**");
}