const Discord = require('discord.js');
const package = require('../package.json')
const config = require('../config.json')

exports.run = (inv, message, args) => {
if (!servers[message.guild.id].playing) {
			message.reply(":x: | Nothing Playing!")
		}
		    if (message.member.voiceChannel) {
			    if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) {
				    message.reply("Please join voice channel with me!")
				    return;
			    } else { 
					console.log("queue over");
						servers[message.guild.id].playing = false;
				    	servers[message.guild.id].queue = []
						message.member.voiceChannel.leave();
						return;
			    }
		    } else {
   			   message.reply('You're not in a voice channel :x: !');
			    return;
    			}
		  }
    }
