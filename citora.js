var TelegramBot = require('node-telegram-bot-api');
var fs = require("fs");
var botToken = "";
var botOptions = {
		polling: true
	};
fs.readFile("token.txt", 'utf8', function(err, data) {
  if (err) throw err;
  botToken = data;
  loadBot();
});
function loadBot() {
	var bot = new TelegramBot(botToken, botOptions);
	bot.getMe().then(function(me) {
		console.log('Hello! My name is %s!', me.first_name);
		console.log('My id is %s.', me.id);
		console.log('And my username is @%s.', me.username);
	});
	bot.on('text', function(msg) {
		var messageChatId = msg.chat.id;
		var messageText = msg.text.toLowerCase();
		var messageDate = msg.date;
		var messageUserId = msg.from.id;
		if(messageText === "риамс" || messageText === "riams") {
			this.sendMessage(messageChatId, "LINK: rmis11.cdmarf.ru");
			this.sendMessage(messageChatId, "DNS: 10.33.80.61/62");
			this.sendMessage(messageChatId, "HOST: 10.33.80.108 rmis11.cdmarf.ru");
			if(messageChatId !== messageUserId) {
				this.sendMessage(msg.from.id, "hello");
			}
			
		}
		console.log(msg);
	});
}

