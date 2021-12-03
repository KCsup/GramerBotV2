import * as discord from "discord.js";
import * as main from "../main";

let cooldown = [];

export async function listener(msg: discord.Message) {
    let guild: discord.Guild = msg.guild;
    let args = msg.content.split(" ");
    args = args.slice(1);

    if(args.length == 1 && (args[0].toLocaleLowerCase() == "leaderboard" || args[0].toLocaleLowerCase() == "lb")) {
        let embed = new discord.MessageEmbed()
            .setTitle("Quadneo Leaderboard")
            .setColor("PURPLE");
        let lb = main.leaderboard.getLeaderboardAsMap();
        let keys = Array.from(lb.keys());
        for(let key of keys) {
            if(keys.indexOf(key) >= 5) break;

            let slot = "NA"

            let member = await guild.members.fetch(key)
            if(member) slot = `${member.displayName}: ${lb.get(key)}`;

            embed.addField((keys.indexOf(key) + 1).toString(), slot)
        }

        msg.channel.send({"embeds": [embed]});
        return;
    }


    if(cooldown.some(user => user == msg.author.id)) {
        return;
    }

    let chance = Math.floor(Math.random() * 100);
    let username = msg.member.user.username;
    let message = username + " Undershot the Quadneo by " + chance + "%.";
    if(chance == 0) {
        message += " They Made the Quadneo!!!"
        main.leaderboard.increaseUserScore(msg.member.user);
    }
    msg.channel.send(message);

    if(!cooldown.some(user => user == msg.author.id)) {
        cooldown.push(msg.author.id);
        setTimeout(() => {
            cooldown.splice(cooldown.indexOf(msg.author.id), 1);
        }, 3000);
    }
}

export let aliases = ['qn'];