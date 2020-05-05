const Discord = require('discord.js');
const bot = new Discord.Client();
const search = require('yt-search');
const config = require('./config.js')

let main = bot.on("message", (msg) =>{
	const content = msg.content;
//Detect if the message isn't from the private message or if the author isn't another bot
	if (!msg.channel.guild || msg.author.bot){
 		return;
 	}
//Super rare reactions (lol why not?)
	if(Math.floor(Math.random()*1000 + 1) == 7){
		msg.react("😔")
	}
 	if(Math.floor(Math.random()*1220703100000 + 1) == 7){
 		msg.react("✨")
 	}
//Detect the prefix and run the commands
 	if (content.startsWith("tb!") || content.startsWith("Tb!") || content.startsWith("tB!") || content.startsWith("TB!")) { 	
	 	
	 	const parts = content.split(' ').map(s => s.trim()).filter(s => s);
	  	let commandName = parts[0].substr(3);
		const args = parts.slice(1);

	//COMMANDS:
	let commands = []
		// <HELP> Lists all the commands:
		commands["help"] = {
			name: "Help",
			syntax: "tb!help",
			desc: "Mostra esta lista com todos os comandos disponíveis.",
			run: function() {
				for(command in commands){
					let cmd = commands[command]
					msg.channel.send("**:star: "+cmd.name+"**\n   ``"+cmd.syntax+"``\n   "+cmd.desc+"\n")
				}
			}
		}
		// <YOUTUBE> Searches for the 5 main results:
		commands["youtube"] = {
			name: "Youtube",
			syntax: "tb!youtube <palavra-chave>",
			desc: "Envia os 5 principais vídeos relacionados.",
			run: function() {
				search(args.join(' '), (err, res) => {
					if(err){
						msg.channel.send(":x: Erro ao pesquisar o vídeo.\n``Uso: "+this.syntax+"``")
					}else{
						let videos = res.videos.slice(0,5);
						for(video in videos){
							let n = parseInt(video, 10)+1;
							msg.channel.send("**Vídeo "+n+"**: "+videos[video].title + "\n``"+videos[video].url+"``   ``["+videos[video].timestamp+"]``");
						}
					}
				})
			}
		}
		// <SAY> Sends a message in the name of the bot:
		commands["say"] = {
			name: "Say",
			syntax: "tb!say <mensagem>",
			desc: "Envia a mensagem no nome do bot.",
			run: function() {
				msg.channel.send(args.join(' '));
				msg.delete();
				commandName = "";
			}
		}

	//Compare and run the commands
		switch(commandName){
			case 'help':
				commands["help"].run();
				break;
			case 'youtube':
				commands["youtube"].run();
				break;
			case 'say':
				commands["say"].run();
			default:
				if(commandName == ""){return;}else{
					msg.reply("não existe esse comando :pensive:");}
				break;
		}

	}
})

//Bot login
bot.login(config.key).then(() => {
	console.log('Bot running');	
}).catch((error) => {
	console.log("Error: "+ error);
});
