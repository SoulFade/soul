const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json");
const database = require("sqlite3objs");
require("./user.js");
const userdb = new database("../userboard.db");

exports.run = (inv, message, args) => {
    message.reply(` \`\`\`\n${JSON.stringify(args, null, 4)}\n\`\`\` `);
    return;
    let user = userdb.select("users", {
        where: {
            userID: message.author.id
        }
    });
    if (!user.length) userdb.insert("users", {
        userID: message.author.id,
        cash: 0
    });
    user = user[0];
    const update = (obj) => {
        userdb.update("users", {
            userID: message.author.id
        }, obj);
        user = userdb.select("users", {
            where: {
                userID: message.author.id
            }
        })[0];
    };
    let mentions = message.mentions.users.array();
    if (!mentions.length) return (message.reply("Please mention someone to send money to."));
    let touser = userdb.select("users", {
        where: {
            userID: mentions[0].user.id
        }
    });
    if (!touser.length) return (message.reply("This user is not registered in our system!"));
    touser = touser[0];
    update({
        cash: user.cash - 0
    });
    userdb.update("users", {
        id: touser.id
    }, {
        cash: touser.cash + 0
    });
    message.reply("sent - to <@${touser.id}>!");
};