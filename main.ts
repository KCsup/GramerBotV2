import { Client } from "discord.js";
import {readdir} from "fs/promises";
import * as fs from "fs";
import * as events from "./events";
export * as leaderboard from "./leaderboard/leaderboard";
export * as mee6Manager from "./mee6/mee6";
export const mee6 = require("mee6-levels-api");
export const bot = new Client({intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]});
export let prefix = "!";

export let commands = {};

export function loadCommands() {
    readdir("./commands/").then(async (files) => {
        for(let file of files) {
            if(!file.endsWith(".ts")) continue;
            let fileName = file.slice(0,-3);
            let command = await import(`./commands/${fileName}`);
            commands[file.slice(0, -3)] = {
                "command": command.listener,
                "aliases": command.aliases
            }
    }

    console.log("Loaded Commands!");
    });
}

loadCommands();
events.loadEvents(commands);

let token = JSON.parse(fs.readFileSync("./token.json").toString())["token"];
bot.login(token);

setTimeout(() => {
    console.log("5 seconds")
}, 5000);