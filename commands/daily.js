const Discord = require('discord.js');
const package = require("../package.json");
const config = require("../config.json");
const database = require("sqlite3objs");
require("./user.js");
const userdb = new database("../userboard.db");

exports.run = (inv, message, args) => {
    let ee = message;
    ee.user = userdb.select("users", {
        where: {
            userID: message.author.id
        }
    });
    if (!ee.user.length) {
        userdb.insert("users", {
            userID: message.author.id,
            cash: 0
        });
        ee.user = userdb.select("users", {
            where: {
                userID: message.author.id
            }
        });
    }
    ee.user = ee.user[0];
    const $update = (obj) => {
        userdb.update("users", {
            id: ee.user.id
        }, obj);
        message.reply(typeof(ee.user))
        return (userdb.select("users", {
            where: {
                id: ee.user.id
            }
        })[0]);
    };
    if (new Date().getTime() < ee.user.lastDaily + (1000 * 60 * 60 * 24)) {
        return (message.reply("Please wait the full 24 hrs before claiming again!"));
    }
    ee.user = $update({
        cash: ee.user.cash + 100
    });
    message.reply(typeof(ee.user));
    //message.reply(`You have received your daily 100 VBucks!\nYou now have ${user.cash} VBucks!`);
};