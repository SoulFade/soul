const {RichEmbed} = require('discord.js');
const config = require('../config.json');

exports.run = async (client, message, args) => {
    const m = await message.channel.send("Pinging...");
    m.delete();
    const pingEmbed = new RichEmbed()
      .setTitle('Pong!')
      .addField('Bot Latency', `${m.createdTimestamp - message.createdTimestamp} ms`, true)
      .addField('API Latency', `${Math.round(client.ping)} ms`, true)
      .setTimestamp()
      .setColor(config.embedcolor);
   message.channel.send(pingEmbed);
};