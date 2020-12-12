const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Tサーバー内の現在の音楽を一時停止します",
    usage: "[pause]",
    aliases: ["pause"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: プレーヤーが停止し、キューがクリアされました。: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ あなたのために音楽を一時停止しました！")
      .setColor("YELLOW")
      .setTitle("音楽が一時停止されました！")
      return message.channel.send(xd);
    }
    return sendError("このサーバーでは何も再生されていません。", message.channel);
  },
};
