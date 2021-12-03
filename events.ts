import { Guild, GuildManager } from "discord.js";
import * as main from "./main";
import * as discord from "discord.js";

export function loadEvents(commands) {
    main.bot.on("messageCreate", async msg => {
        let guild: discord.Guild = msg.guild;
        if(msg.content.startsWith(main.prefix)) {
            msg.content = msg.content.slice(1).trim();
            let args = msg.content.split(" ");
            let command = args[0].toLocaleLowerCase();
            args = args.slice(1);

            if(commands[command]) commands[command].command(msg);
            else {
                for(let c of Object.keys(commands)) {
                    let com = commands[c];
                    if(com.aliases == undefined) continue;

                    for(let alias of com.aliases) {
                        if(alias == command) {
                            com.command(msg);
                            return;
                        }
                    }
                }
            }
        }

        if(msg.author.username == "travisscott") {
            msg.delete();
        }

        if(await main.mee6Manager.getUserInfo(guild.id, msg.author.id) == undefined) return;
        let userLevel: number = (await main.mee6Manager.getUserInfo(guild.id, msg.author.id)).level;
        for(let role of await main.mee6Manager.getRoles(guild.id)) {
            if(userLevel >= role["level"] && 
            !(await main.mee6Manager.getUserRoles(guild.id, msg.author.id)).some(uRole => uRole.name == role['name'])) {
                let member: discord.GuildMember = await guild.members.fetch(msg.author.id);
                member.roles.add(role["role"]);
                msg.channel.send(`Woah, congratulations on reaching level ${role["level"]} <@${msg.author.id}>!`)
            }
        }
    });

    main.bot.on("ready", () => {
        console.log("Gramers Bot Ready!");
    })
}