import * as discord from "discord.js";
import * as main from "../main";

let answers = ['As I see it, yes.',
                   'Ask again later.',
                   'Better not tell you now.',
                   'Cannot predict now.',
                   'Concentrate and ask again.',
                   'Don’t count on it.',
                   'It is certain.',
                   'It is decidedly so.',
                   'Most likely.',
                   'My reply is no.',
                   'My sources say no.',
                   'Outlook not so good.',
                   'Outlook good.',
                   'Reply hazy, try again.',
                   'Signs point to yes.',
                   'Very doubtful.',
                   'Without a doubt.',
                   'Yes.',
                   'Yes – definitely.',
                   'You may rely on it.']

export function listener(msg: discord.Message) {
    let commandName = msg.content.split(' ')[0];
    let args = msg.content.replace(commandName, '');
    if(!args) {
        msg.channel.send("You must ask a question!");
        return;
    }

    msg.channel.send(`Question:${args}\nAnswer: ${answers[Math.floor(Math.random() * (answers.length))]}`)
}

export let aliases = ['8ball']