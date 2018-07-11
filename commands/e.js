const Discord = require('discord.js');
exports.run = async (inv, message, args) => {
      if (["337343219128074240","239233310574903297"].indexOf(message.author.id) === -1){return;}
        let cmdparse = require("./cmdparse");
        let data = message;
        let cmd = cmdparse(data.content);
        args.splice(0, 1);
        console.log({cmd});
        data.cmd = cmd;
        data.send = (($) => data.channel.send($));
        const newEmbed = require("./newEmbed")(Discord);
        console.log(data.cmd) 
        (async () => {
            return (eval(`${data.cmd.join(" ")};`));
        })()
        .then(output => {
            data.send(newEmbed({
                title: "**Eval Success**",
                color: 0x00ff00,
                fields: [
                    { title: "Result:", value: output !== undefined ? output : true }
                ]
            })).catch(console.warn);
        })
        .catch((e) => {
            data.send(newEmbed({
                title: "**Eval Failed**",
                color: 0xff0000,
                fields: [
                    { title: "Result:", value: e.message }
                ]
            })).catch(console.warn);
        });
}

