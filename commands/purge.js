const Discord = require('discord.js');
const config = require('../config.json');
const package2 = require("../package.json");
const client = new Discord.Client();


client.on('message', function(message) {
    if (message.content == "^clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});