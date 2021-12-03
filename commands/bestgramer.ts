import * as discord from "discord.js";
import * as main from "../main";

export async function listener(msg: discord.Message) {
    let guild: discord.Guild = main.bot.guilds.resolve(msg.guildId);
    // guild.members.fetch().then((members) => {
    //     members.forEach(member => {
    //         main.mee6.getUserXp(guild.id, member.id).then(user => {
    //             if(user == undefined || user.rank != 1) return;
                
    //             msg.channel.send(`The current best Gramer is <@${member.id}>, with a level of ${user.level}!`)
    //         })
    //     })
    // })
    for(let info of await main.mee6Manager.getAllUserInfo(guild.id)) {
        if(info.rank != 1 || info == undefined) continue;

        msg.channel.send(`The current best Gramer is ${info.tag}, with a level of ${info.level}!`)
    }
    
}

export let aliases = ['bestgramer'];