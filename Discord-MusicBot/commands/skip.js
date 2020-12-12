const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "skip",
    description: "現在の音楽をスキップします",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("申し訳ありませんが、音楽を再生するには音声チャンネルに参加する必要があります", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("私があなたのためにスキップできる演奏は何もありません", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ あなたのために音楽を再開しました")
      .setColor("YELLOW")
      .setTitle("音楽が再開されました")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: プレーヤーが停止し、キューがクリアされました: ${error}`, message.channel);
      }
    message.react("✅")
  },
};
