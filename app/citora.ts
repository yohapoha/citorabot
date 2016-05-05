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
		if(chatSystem === 1) {
			answerMessage = "Меню (Карта меню: /menu_map)";
			markup = bot.inlineKeyboard([
				[
					bot.inlineButton('Информационные системы', { callback: "systems" })
				]
			], {resize: true});
			bot.sendMessage(user.id, `Привет, ${firstName}!`);
			bot.sendMessage(user.id, answerMessage, { markup });
		} else {
			answerMessage = "Меню";
			markup = bot.keyboard([
				['Информационные системы']
			], {resize: true});
		}	
	}
	if(chatSystem === 1) {
		if(message === "/menu_map") {
			message = `
			Меню (/menu)
			--- Информационные системы (/is)
			------ ГИС ЭО (/giseo)
			--------- Настройки (/giseo_settings)
			------------ Основные настройки (/giseo_settings_main)
			`;
			markup = bot.inlineKeyboard([
				[
					bot.inlineButton('Информационные системы', { callback: "systems" })
				]
			], {resize: true});
			bot.sendMessage(user.id, message, { markup });
		}
	} else {
		if(message === "Меню") {
			answerMessage = "Меню";
			markup = bot.keyboard([
				['Информационные системы']
			], {resize: true});
		}
		if(message === "Информационные системы") {
			answerMessage = "Меню > Информационные системы";
			markup = bot.keyboard([
				['Меню'],
				['ГИС ЭО'],
				['РИАМС']
			], {resize: true});
		}
		if(message === "ГИС ЭО") {
			answerMessage = "Меню > Информационные системы > ГИС ЭО";
			markup = bot.keyboard([
				['Меню', 'Информационные системы'],
				['[ГИС ЭО] Настройки'],
				['[ГИС ЭО] Контакты'],
				['[ГИС ЭО] Информация']
			], {resize: true});
		}
		if(message === "[ГИС ЭО] Настройки") {
			answerMessage = "Меню > Информационные системы > ГИС ЭО > Настройки";
			markup = bot.keyboard([
				['Меню', 'ГИС ЭО'],
				['[ГИС ЭО] Основные настройки'],
				['[ГИС ЭО] Полные настройки (файл)']
			], {resize: true});
		}
		if(message === "[ГИС ЭО] Основные настройки") {
			answerMessage = "Меню > Информационные системы > ГИС ЭО > Настройки > Основные настройки";
			markup = bot.keyboard([
				['Меню', '[ГИС ЭО] Настройки'],
			], {resize: true});
			bot.sendMessage(user.id, "LINK: rmis11.cdmarf.ru; DNS: 10.33.80.61/62; HOST: 10.33.80.108 rmis11.cdmarf.ru;");
		}
		bot.sendMessage(user.id, answerMessage, { markup });
	}
});
bot.on('callbackQuery', msg => {
	var message = "";
	var markup = "";
	bot.answerCallback(msg.id);
	if(msg.data === "menu") {
		message = "Меню";
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('Информационные системы', { callback: "systems" })
			]
 	 	], {resize: true});
	}
	if(msg.data === "systems") {
		message = `Меню (/menu)
		--- Информационные системы (/is)
		`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('Назад', { callback: "menu" })
			],
			[
				bot.inlineButton('ГИС ЭО', { callback: "giseo" })
			],
			[
				bot.inlineButton('РИАМС', { callback: "riams" })
			]
 	 	], {resize: true});
	}
	if(msg.data === "giseo") {
		message = `
		Меню (/menu)
		--- Информационные системы (/is)
		------ ГИС ЭО (/giseo)
		`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('Меню', { callback: "menu" }), bot.inlineButton('Назад', { callback: "systems" })
			],
			[
				bot.inlineButton('Настройки', { callback: "giseo_settings" })
			],
			[
				bot.inlineButton('Контакты', { callback: "giseo_contacts" })
			],
			[
				bot.inlineButton('Информация', { callback: "giseo_information" })
			]
 	 	], {resize: true});
	}
	if(msg.data === "giseo_settings") {
		message = `
		Меню (/menu)
		--- Информационные системы (/is)
		------ ГИС ЭО (/giseo)
		--------- Настройки (/giseo_settings)
		`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('Меню', { callback: "menu" }), bot.inlineButton('Назад', { callback: "giseo" })
			],
			[
				bot.inlineButton('Основные настройки', { callback: "giseo_settings_main" })
			],
			[
				bot.inlineButton('Полные настройки (файл)', { callback: "giseo_settings_full" })
			]			
 	 	], {resize: true});
	}
	if(msg.data === "giseo_settings_main") {
		message = `
		Меню (/menu)
		--- Информационные системы (/is)
		------ ГИС ЭО (/giseo)
		--------- Настройки (/giseo_settings)
		------------ Основные настройки (/giseo_settings_main)
		`;
		markup = bot.inlineKeyboard([
			[
				bot.inlineButton('Меню', { callback: "menu" }), bot.inlineButton('Назад', { callback: "giseo_settings" })
			]
		]);
		let command_output = `Основные настройки ГИС ЭО:
		LINK: rmis11.cdmarf.ru
		DNS: 10.33.80.61/62
		HOST: 10.33.80.108 rmis11.cdmarf.ru`;
		bot.sendMessage(user.id, command_output);
	}
	bot.sendMessage(user.id, message, { markup });
});
bot.connect();
