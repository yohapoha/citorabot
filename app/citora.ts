import {User} from './modules/authorization/model.ts';
import {messageModel} from "./modules/control/controller.ts";

declare function require(name:string);

var fs = require("fs");
var settingsJSON = fs.readFileSync("./data/settings.json");
var settings = JSON.parse(settingsJSON);
var chatSystem = 1;

var Telebot = require('telebot');
var bot = new Telebot({
	token: settings.token, // Required. 
	sleep: 1000, // Optional. How often check updates (in ms). 
	timeout: 0, // Optional. Update pulling timeout (0 - short polling). 
	limit: 100, // Optional. Limits the number of updates to be retrieved. 
	retryTimeout: 5000 // Optional. Reconnecting timeout (in ms).
});
// var TelegramBot = require('node-telegram-bot-api');
var user;
function textFunc() {
	console.log("hello");
}
bot.on('text', msg => {
	if(typeof user !== "Object") {
		user = new User(msg.from.id);
		console.log("Пользователь активирован");
	}
	let message = msg.text;
	var answerMessage = "";
	var markup = "";
	var fromId = msg.from.id;
	var firstName = msg.from.first_name;
	var reply = msg.message_id;
	if(message.toLowerCase() === "привет") {
		message = `Привет, ${firstName}!`;
		message += "\n\n--------------------\n\n";
		message += "Текущая позиция:\n\n";
		message += "Главная";
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('[ + ] Информационные системы', { callback: "systems" })
			],
			[
				bot.inlineButton('[ + ] Акты', { callback: "acts" })
			],
			[
				bot.inlineButton('[ + ] Шаблоны', { callback: "templates" })
			],
			[
				bot.inlineButton('Доступные команды', { callback: "commands" })
			],
			[
				bot.inlineButton('О боте', { callback: "bot" })
			]
		], {resize: true});
		bot.sendMessage(user.id, message, { markup });	
	}
});
bot.on('callbackQuery', msg => {
	var message = "Текущая позиция:\n\n";
	var markup = "";
	bot.answerCallback(msg.id);
	if(msg.data === "menu") {
		message += "Главная";
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('[ + ] Информационные системы', { callback: "systems" })
			],
			[
				bot.inlineButton('[ + ] Акты', { callback: "acts" })
			],
			[
				bot.inlineButton('[ + ] Шаблоны', { callback: "templates" })
			],
			[
				bot.inlineButton('Доступные команды', { callback: "commands" })
			],
			[
				bot.inlineButton('О боте', { callback: "bot" })
			]
 	 	], {resize: true});
	}
	if(msg.data === "systems") {
		message += `Главная > Информационные системы`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('На главную', { callback: "menu" }), bot.inlineButton('Назад', { callback: "menu" })
			],
			[
				bot.inlineButton('[ + ] ГИС ЭО', { callback: "giseo" })
			],
			[
				bot.inlineButton('[ + ] РИАМС', { callback: "riams" })
			]
 	 	], {resize: true});
	}
	if(msg.data === "giseo") {
		message += `Главная > Информационные системы > ГИС ЭО`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('На главную', { callback: "menu" }), bot.inlineButton('Назад', { callback: "systems" })
			],
			[
				bot.inlineButton('[ + ] Настройки', { callback: "giseo_settings" })
			],
			[
				bot.inlineButton('[ + ] Контакты', { callback: "giseo_contacts" })
			],
			[
				bot.inlineButton('[ + ] Решения ошибок', { callback: "giseo_errors" })
			],
			[
				bot.inlineButton('О системе', { callback: "giseo_information" })
			]
 	 	], {resize: true});
	}
	if(msg.data === "giseo_settings") {
		message += `Главная > Информационные системы > ГИС ЭО > Настройки`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('На главную', { callback: "menu" }), bot.inlineButton('Назад', { callback: "giseo" })
			],
			[
				bot.inlineButton('Краткие настройки', { callback: "giseo_settings_main" })
			],
			[
				bot.inlineButton('[ Файл ] Полные настройки', { callback: "giseo_settings_full" })
			]			
 	 	], {resize: true});
	}
	if(msg.data === "giseo_settings_main") {
		message = "Основные настройки ГИС ЭО:\n\nLINK: rmis11.cdmarf.ru\nDNS: 10.33.80.61/62\nHOST: 10.33.80.108 rmis11.cdmarf.ru";
		message += "\n\n--------------------\n\n";
		message += "Текущая позиция:\n\n";
		message += `Главная > Информационные системы > ГИС ЭО > Настройки > Основные настройки`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('На главную', { callback: "menu" }), bot.inlineButton('Назад', { callback: "giseo_settings" })
			]
		]);
	}
	bot.sendMessage(user.id, message, { markup });
});
bot.connect();
