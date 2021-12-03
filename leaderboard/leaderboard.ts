import * as fs from "fs";
import * as main from "../main";
import * as discord from "discord.js";

let leaderboardFile = "./leaderboard.json";

filesCheck();

function filesCheck() {
    if(!fs.existsSync(leaderboardFile)) {
        let data = {};
        data = JSON.stringify(data);
        fs.writeFileSync(leaderboardFile, data.toString());
    }
}

export function getUserScore(user: discord.User): number {
    let json = getLeaderboardJson();
    return json[user.id];
}

export function increaseUserScore(user: discord.User) {
    let json = getLeaderboardJson();
    if(json[user.id]) {
        let score = getUserScore(user);
        json[user.id] = score + 1;
        fs.writeFileSync(leaderboardFile, JSON.stringify(json));
    } else {
        setUserInstance(user, 1);
    }
}

export function getLeaderboardJson() {
    return JSON.parse(fs.readFileSync(leaderboardFile).toString());
}

export function getLeaderboardJsonSorted(): object {
    let json = getLeaderboardJson();
    let lbSorted = {};
    let lbKeysSorted = Object.keys(json).sort(function(a,b){return json[b]-json[a]});
    for(let key of lbKeysSorted) {
        lbSorted[key] = json[key];
    }
    return lbSorted;
}

export function getLeaderboardAsMap() {
    let json = getLeaderboardJsonSorted();
    let lbMap = new Map();
    for(let key of Object.keys(json)) {
        lbMap.set(key, json[key]);
    }

    return lbMap;
}

function setUserInstance(user: discord.User, score: number) {
    let json = getLeaderboardJson();
    if(json[user.id]) return;

    json[user.id] = score;
    fs.writeFileSync(leaderboardFile, JSON.stringify(json));
}
