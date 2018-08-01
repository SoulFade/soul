const Discord = require('discord.js');
exports.run = (inv, message, args) => {
    const mentions = message.mentions.users;
    if (mentions.size === 2) {
        message.react("❤");
        const special_users = ["337343219128074240", "397150181184897027"];
        let special = false;
        special_users.forEach((id) => mentions.has(id) ? special = true : false);
        let percent = special ? 100 : Math.floor(Math.random() * 100);
        let extra = "";
        const extras = {
            "397150181184897027": "She belongs with Alphi#9839 <3",
            "337343219128074240": "He belongs to Enchantress#7679 <3"
        };
        percent = 0;
        const alwaysMatch = [
            ["397150181184897027", "337343219128074240"]
        ];
        Object.keys(extras).forEach((id) => mentions.has(id) ? extra += "\n" + extras[id] : false);
        alwaysMatch.forEach((ids) => {
            if (mentions.has(ids[0]) && mentions.has(ids[1])) percent = 100;
        });
        const love = new Discord.RichEmbed()
            .setTimestamp()
            .setColor(`#ff0000`)
            .addField(`${mentions.array()[0].username} and ${mentions.array()[1].username} have a: `, `${percent}% love connection.${extra}`);
        message.channel.send(love);
    } else message.channel.send(`Please mention (2) people.`);
}
