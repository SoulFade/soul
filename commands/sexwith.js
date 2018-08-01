const Discord = require('discord.js');
exports.run = async (inv, message, args) => {
const withyou = message.mentions.members.first();
if(!withyou) {
  message.react("❌")
 return message.channel.send(":x: | Please tag a member in order to request sex! (Command won't work if no one is tagged...) ") 
} else {
 message.react("🔞")
 message.react("❤")
   const success = new Discord.RichEmbed()
   .setTitle("Success!", message.author.avatarURL)
   .setColor(`0x00ff00`)
   .setDescription("You were succesful at having sex with " + `${withyou.username}`)
   .setFooter("Requested by: " + message.author.username)
   .setTimestamp()
   message.channel.send(success)
  let percent =  Math.floor(Math.random() * 100);
  const nightpercent = new Discord.RichEmbed()
  .setTitle("Enjoy Rate", message.author.avatarURL)
  .setDescription(`${withyou.array()[0].username} and ${message.author.username} enjoyed their night in a: `, `${percent}% ❤`)
  .setColor(`0x00ff00`)
  .setTimestamp()
  .setFooter("Requested by " + message.author.username)
  message.channel.send(nightpercent)


 }
}
