const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "サーバーのソングキューの音量を変更します",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("申し訳ありませんが、音楽を再生するには音声チャンネルに参加する必要があります", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("このサーバーでは何も再生されていません", message.channel);
    if (!args[0])return message.channel.send(`現在のボリュームは: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: 数字のみ').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('音量を150以上または0未満に設定することはできません。',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`現在のボリュームは: **${args[0]/1}/100**`)
    .setAuthor("サーバーボリュームマネージャー", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};
