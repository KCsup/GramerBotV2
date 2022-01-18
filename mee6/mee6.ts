import * as fs from "fs";
import * as main from "../main";
import * as discord from "discord.js";

let rolesFile = "./roles.json";

export function getRolesJson() {
    return JSON.parse(fs.readFileSync(rolesFile).toString());
}

export function getUserInfo(guildId, memberId) {
    return main.mee6.getUserXp(guildId, memberId);
}

export async function getAllUserInfo(guildId) {
    let guild: discord.Guild = await main.bot.guilds.fetch(guildId);
    if(guild == undefined) return null;

    let userInfo = [];
    for(let m of await guild.members.fetch()) {
        let info = await getUserInfo(guildId, m[0]);
        if(m == undefined || info == undefined) continue;
        userInfo.push(info);
    }

    return userInfo;
}

export async function getRoles(guildId): Promise<Object[]> {
    let guild: discord.Guild = await main.bot.guilds.fetch(guildId);
    if(!guild) return null;
    
    let rolesJson = getRolesJson();
    let roles = [];
    for(let role of rolesJson.roles) {
        if((await guild.roles.fetch()).some(r => r.name == role.name))
        roles.push({
            name: role.name,
            role: (await guild.roles.fetch()).find(r => r.name == role.name),
            level: role.level
        });
    }

    return roles;
}

export async function getUserRoles(guildId, memberId) {
    let guild: discord.Guild = await main.bot.guilds.fetch(guildId);
    let member: discord.GuildMember = await guild.members.fetch(memberId);
    if(guild == undefined || member == undefined) return null;

    let roles = await getRoles(guildId);
    let uRoles = [];
    for(let roleO of roles) {
        let role: discord.Role = roleO["role"];
        if(member.roles.resolve(role.id))
        uRoles.push(roleO);
    }

    return uRoles;
}