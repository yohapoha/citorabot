import {User} from './modules/authorization/model.ts';
import {messageModel} from "./modules/control/controller.ts";

declare function require(name:string);

var TelegramBot = require('node-telegram-bot-api');
var fs = require("fs");
var settingsJSON = fs.readFileSync("./data/settings.json");
var settings = JSON.parse(settingsJSON);

loadBot();
function loadBot() {
	var user;
	var bot = new TelegramBot(settings.token, settings.options);
	var types = TelegramBot.types;
	bot.getMe().then(function(me) {
		console.log("Bot's start!");
		// console.log('Hello! My name is %s!', me.first_name);
		// console.log('My id is %s.', me.id);
		// console.log('And my username is @%s.', me.username);
	});
	bot.on('text', function(msg) {
		var _this = this;
		if(typeof user !== "Object") {
			user = new User(msg.from.id);
			console.log("Пользователь активирован");
		}
		var button = types.button("Перейти на Яндекс", "https://ya.ru");
		this.sendMessage(user.id, button);
		var message:string | Array<String> = messageModel(settings.registration, msg.text, user.commands);
		if(typeof message === "object") {
			message.map(function(element, index) {
				_this.sendMessage(user.id, element);
			})
		} else {
			this.sendMessage(user.id, message);
		}
		
		//this.sendMessage(user.id, message);
		
		// var messageChatId = msg.chat.id;
		// var messageText = msg.text.toLowerCase();
		// var messageDate = msg.date;
		// var messageUserId = msg.from.id;
		// if(messageText === "риамс" || messageText === "riams") {
		// 	this.sendMessage(messageChatId, "LINK: rmis11.cdmarf.ru");
		// 	this.sendMessage(messageChatId, "DNS: 10.33.80.61/62");
		// 	this.sendMessage(messageChatId, "HOST: 10.33.80.108 rmis11.cdmarf.ru");
		// 	if(messageChatId !== messageUserId) {
		// 		this.sendMessage(msg.from.id, "hello");
		// 	}
		// }
		// if(messageText === "/start") {
		// 	var _this = this;
		// 	user = new User(msg.from.id);
		// 	this.sendMessage(msg.from.id, "Ваш ID: "+user.id+". Ваш уровень доступа: "+user.level+".");
		// 	this.sendMessage(msg.from.id, "Список доступныx Вам комманд:");
		// 	user.commands.map(function(element, index) {
		// 			_this.sendMessage(msg.from.id, element.command+" ("+element.commandAlt+") - "+element.name);
		// 	})
		// }
		// console.log(msg);
	});
}

