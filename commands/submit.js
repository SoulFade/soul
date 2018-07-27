const discord = requre("discord.js")

exports.run = (inv, message, args) => {
        
        if (command === "submit") {
        if (message.channel.id !== "465277567491112972") return message.channel.send("You can use this command only in #staff-application");
        let chan = inv.channels.get("465277567491112972");
        let chan2 = inv.channels.get("465269674389667871");
        let msg = args.join(" ")
        if (!msg) return message.reply("Please tell us for what are you applying!");

        chan.send(`${message.author} Application Enqueued. Please Wait.`);

        chan2.send(msg);
    }

 
    
