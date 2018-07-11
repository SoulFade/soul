const discord = require('discord.js');

exports.run = (bot, message, params) => {
    let mention = message.mentions.users.first();
    var notmentiond = new discord.RichEmbed()
        .setAuthor(`Error!`, ("https://cdn.discordapp.com/attachments/447558366076731394/447839283437371392/false-2061131_960_720.png"))
        .setColor(`#ff0000`)
        .setTimestamp()
        .setDescription(`Please mention a user!`)
    if (!mention) return message.channel.send(notmentiond);
    let guildmember = message.guild.member(mention);

    var target = bot.users.find('id', guildmember.id)

    target.send(`You have been kicked from: ${message.guild.name}`).then(() => {
        guildmember.kick().then(() => {
            var success = new discord.RichEmbed()
                .setAuthor(`Success!`, ("https://cdn.discordapp.com/attachments/447558366076731394/448089730073231360/unknown.png"))
                .setColor(`#15ff00`)
                .setTimestamp()
                .setDescription(`Kick successful!`)
            message.channel.send(success)
        }
        )
    }
    )
};

exports.conf = {
    name: 'kick',
    aliases: ['remove'],
    permLevel: 1,
    enabled: true,
    guildOnly: true
};