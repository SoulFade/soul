const Discord = require('discord.js');
exports.run = async (inv, message, args) => {
const withyou = message.mentions.members.first();
if(!withyou) {
  message.react("❌")
 return message.channel.send(":x: | Please tag a member in order to request sex! (Command won't work if no one is tagged...) ") 
} else {
 message.react("🔞")
const underage = new Discord.RichEmbed()
.setTitle("NSFW Command", message.author.avatarURL)
.setColor(`#ff0000`)
.setDescription("This is a NSFW command, it is recommended to use it in NSFW channels to avoid mutes/kicks/bans or warnings.")
.setFooter("Requested by: " + message.author.username)
.setTimestamp()
message.channel.send(underage)
let where = inv.channels.get(message.channel.id)
let response =  await where.awaitMessages(mg => {
        return mg.author.id === inv.users.get(message.author.id);
    }, {max: 1})
    response = response.array()[0];
    if (response.content.toLowerCase() === "yes") {
    const sucess = newDiscord.RichEmbed()
    .setTitle("Success", message.author.avatarURL)
    .setDescription(message.author.username + " had sex with " + message.withyou.username)
    .setColor(`0x00ff00`)
    .setTimestamp()
    message.channel.send(sucess)
  } else {
  const failed = new Discord.RichEmbed()
  .setTitle("Epic Fail", message.author.avatarURL)
  .setDescription(message.author.usename + " failed at having sex with " + message.withyou.username)
  .setColor(`#ff0000`)
  .setTimestamp()
  message.channel.send(failed)
  }
 if(response.content.toLowercase() !== "Agree") {
        message.channel.send("You're underage :underage:, sorry :no_good:")
  }
 }
}
