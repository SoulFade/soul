const Discord = require('discord.js');
exports.run = (inv, message, args) => {
message.react("❤")
const special_users = ["337343219128074240", "397150181184897027"];
const mentions = message.mentions.users;
let special = false;
special_users.forEach((id) => mentions.has(id) ? special = true : false);
const percent = special ? 100 : Math.floor(Math.random()*100);
if (mentions.size === 2) {
  const love = new Discord.RichEmbed()
  .setTimestamp()
  .setColor(`#ff0000`)
  .addField(`${mentions.array()[0].username} and ${mentions.array()[1].username} have a: `, `${percent}% love connection.`); 
  message.channel.send(love);
}
  else message.channel.send(`Please mention (2) people.`);
}
