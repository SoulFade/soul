const Discord = require('discord.js');
exports.run = async (inv, message, args) => {
message.react("👉", "👌", "🔞")
const withyou = message.mentions.members.first();
const underage = new Discord.RichEmbed()
.setTitle("NSFW Command", message.author.avatarURL)
.setColor(`#ff0000`)
.setDescription("This is a NSFW command, it is recommended to use it in NSFW channels to avoid mutes/kicks/bans or warnings.")
.addField("Please type 'I am 18 years or older' to procceed")
.setFooter("Requested by: " + message.author.username)
.setTimestamp()
message.channel.send(underage)
let where = inv.channels.get(message.channel.id)
let response =  await where.awaitMessages(mg => {
        return mg.author.id === message.withyou.id;
    }, {max: 1})
    response = response.array()[0];

 if (response.content.toLowerCase() === "I am 18 years or older"){
        let withyou = message.mentions.members.first();
        message.channel.send(message.withyou.tag + " do you wish to have sex with: " + message.author.username + " ? (Type yes or no)")
         let channel = inv.channels.get(message.channel.id)
         let sexwith =  await channel.awaitMessages(mg => {
        return mg.withyou.id === message.withyou.id;
    }, {max: 1})
    sexwith = sexwith.array()[0];
    if (sexwith.content.toLowerCase() === "yes") {
    const sucess = newDiscord.RichEmbed()
    .setTitle("Success", message.author.avatarURL)
    .setDescription(message.author.username + " had sex with " + message.withyou.username)
    .setColor(`0x00ff00`)
    .setTimestamp()
    message.channel.send(sucess)
  } 
 } else {
  const failed = new Discord.RichEmbed()
  .setTitle("Epic Fail", message.author.avatarURL)
  .setDescription(message.author.usename + " failed at having sex with " + message.withyou.username)
  .setColor(`#ff0000`)
  .setTimestamp()
  message.channel.send(failed)
  }
 if(response.content.toLowercase() !== "I am 18 years or older") {
        message.channel.send("You're underage :underage:, sorry :no_good:")
 }
}
