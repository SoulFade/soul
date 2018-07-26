const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json")
exports.run = (inv, message, args) => {
   const rando_imgs = [
'https://media.giphy.com/media/CZpro4AZHs436/giphy.gif',
'https://media.giphy.com/media/CZpro4AZHs436/giphy2.gif',
'https://media.giphy.com/media/CZpro4AZHs436/giphy3.gif',
]
   message.channel.send(`${message.author} gave ${member} a hug :heart:!`, {
    file: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
  });
}
