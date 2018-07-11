const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
      let support = message.guild.roles.find("name", "Support Team");
      let admin = message.guild.roles.find("name", "Admin");
      let founder = message.guild.roles.find('name', 'Founder');
      let ticketLogs = message.guild.channels.find('name', 'ticket-logs');
      if (!ticketLogs) {
        return message.reply("I can't find the channel \"#ticket-logs\"")
      }
      if (!support || !admin || !founder) {
        message.reply ("I can't find the one of the staff roles!!");
        return;
      }
      if (![founder.id, admin.id].some(rid => message.member.roles.has(rid))) return message.reply('You do not have permission to use this command!');
      if (!message.channel.name.startsWith('ticket-')) return message.reply('This is not a support ticket channel!');
      if (args[0]) {
        switch(args[0].toLowerCase()) {
          case 'close': {
                  message.channel.send('Do you really want to close this channel? Type `yes` to confirm, else wait it.');
                  const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === 'yes';
                  message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                          ticketLogs.send({embed: {
                    "title": "Ticket Closed",
                    "description": `Ticket ${message.channel.name} has been closed`,
                    "color": 16729856,
                    "timestamp": new Date(),
                  }});
                          message.channel.delete();
                          message.author.send (`✅ Closed Ticket \`${message.channel.name}\``);
                        })
                    .catch(collected => message.channel.send('Ticket Delete Menu has Closed due to Inactivity!'));
              break;
          };
          case 'archive': {
                  message.delete();
                  message.channel.send(new RichEmbed().setTitle('✅ Ticket Archived').setDescription(`${message.channel} has been archived; only Administrators and Support can view this channel`).setColor('RED'));
                  ticketLogs.send(new RichEmbed().setTitle('Ticket Archived').setDescription(`Ticket ${message.channel} has been archived`).setColor(16729856).setTimestamp().setAuthor(message.author.tag, message.author.displayAvatarURL).setFooter(client.user.tag, client.user.displayAvatarURL))
                  message.channel.permissionOverwrites.deleteAll()
                  message.channel.overwritePermissions(message.guild.id, { READ_MESSAGES: false });
                  message.channel.overwritePermissions(founder, { READ_MESSAGES: true, SEND_MESSAGES: false });
                  message.channel.overwritePermissions(admin, { READ_MESSAGES: true, SEND_MESSAGES: false });
                  message.channel.setParent('448260296956706846');
          };
        };
        return;
      };
      const embed = new RichEmbed()
        .setTitle('Manage Ticket')
        .setDescription(`React with:\n\n🗑 to delete your ticket permanently\n📁 to Archive Ticket\n❌ to Cancel`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setColor(2003199);
      message.channel.send(embed).then(async (m) => {
          try{
          await m.react('🗑')
          await m.react('📁')
          await m.react('❌');
          }catch(e){
             console.log(e); 
            m.edit('Oops! One of the emojis failed to react!');
          }
          const expectedr = ['❌','📁','🗑'];
          const collector=m.createReactionCollector((reaction, user) => user.id === message.author.id && expectedr.some(i => i === reaction.emoji.name));
          collector.on('collect', r => {
              if (r.emoji.name === '🗑') {
                  message.channel.send('Do you really want to close this channel? Type `yes` to confirm, else wait it.');
                  const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === 'yes';
                  message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                          ticketLogs.send({embed: {
                    "title": "Ticket Closed",
                    "description": `Ticket ${message.channel.name} has been closed`,
                    "color": 16729856,
                    "timestamp": new Date(),
                  }});
                          message.channel.delete();
                          message.author.send (`✅ Closed Ticket \`${message.channel.name}\``);
                        })
                    .catch(collected => message.channel.send('Ticket Delete Menu has Closed due to Inactivity!'));
              };
              if (r.emoji.name === '❌') {
                  m.edit(new RichEmbed().setTitle('❌ Menu Cancelled').setColor('RED'));
                  message.delete(2000);
                  m.delete(2000);
              };
              if (r.emoji.name === '📁') {
                  message.delete();
                  m.edit(new RichEmbed().setTitle('✅ Ticket Archived').setDescription(`${message.channel} has been archived; only Managers and Executives can view this channel`).setColor('RED'));
                  ticketLogs.send(new RichEmbed().setTitle('Ticket Archived').setDescription(`Ticket ${message.channel} has been archived`).setColor(16729856).setTimestamp().setAuthor(message.author.tag, message.author.displayAvatarURL).setFooter(client.user.tag, client.user.displayAvatarURL))
                  message.channel.permissionOverwrites.deleteAll()
                  message.channel.overwritePermissions(message.guild.id, { READ_MESSAGES: false });
                  message.channel.overwritePermissions(admin, { READ_MESSAGES: true, SEND_MESSAGES: false });
                  message.channel.overwritePermissions(founder, { READ_MESSAGES: true, SEND_MESSAGES: false });
                  message.channel.setParent('448260296956706846');
              }; 
              m.clearReactions(new RichEmbed().setTitle('❌ Menu Cancelled').setColor('RED'));                           
          });
          collector.on('end', collected => {message.edit(new RichEmbed().setTitle('❌ Timed Out').setColor('RED'));m.clearReactions();})
      });
};