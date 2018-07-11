const Discord = require('discord.js');
const package2 = require("../package.json")
const fs = require('fs');


exports.run = (inv, message, args) => { 
    const got = require('got');
        const cheerio = require('cheerio');
        const { stringify } = require('querystring');
        if (args.length < 1) message.channel.send('I need to know what to search...');
        await message.channel.send('<a:loading:465944291634839554> Googling....').then(message => { message.delete(1000) });
        const params = {
            q: args.join(' '),
            safe: 'on',
            lr: 'lang_en',
            hl: 'en'
        };
        let resp = await got('https://google.com/search?' + stringify(params), { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) Gecko/20100101 Firefox/53.0' } });
        if (resp.statusCode !== 200) throw 'Google is not responding';
        const $ = cheerio.load(resp.body);
        const results = [];
        let card = null;
        const cardNode = $('div#rso > div._NId').find('div.vk_c, div.g.mnr-c.g-blk, div.kp-blk');
        if (cardNode && cardNode.length !== 0) {
            card = this.parseCards($, cardNode);
        }
        $('.rc > h3 > a').each((i, e) => {
            const link = $(e).attr('href');
            const text = $(e).text();
            if (link) {
                results.push({ text, link });
            }
        });
        if (card) {
            const value = results.slice(0, 3).map(r => `[${r.text}](${r.link})`).join('\n');
            if (value) {
                card.addField(`This is what I also found for: "${params.q}" `, value)
                    .setColor(inv.utils.randomColor())
                    .setURL(`https://google.com/search?q=${encodeURIComponent(params.q)}`);
            }
            return await message.channel.send(card);
        }
        if (results.length === 0) {
            return await message.channel.send("Sorry, I didn't find any results");
        }
        const firstentry = `${results[0].link}`;
        const finalxd = results.slice(0, 2).map(r => `${r.link}`).join('\n');
        await message.channel.send(finalxd);
    }
}
