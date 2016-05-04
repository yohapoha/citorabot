declare function require(name:string);

interface iUser {
   id:number;
   level:number;
   commands:string[]
}
export class User implements iUser { 
	id:number = 0;
	level:number = 0;
	commands:string[] = [];
	constructor(id:number) {
		this.id = id;
		this.level = this.setLevel(this.id);
		this.commands = this.setCommands(this.level);
	}
	private setLevel(id:number):number {
		var fs = require("fs");
		var usersJSON = fs.readFileSync("./data/users.json");
		var users = JSON.parse(usersJSON);
		for(var i = 0; i < users.list.length; i++) {
			if(users.list[i].id === id) {
				return users.list[i].level;
			}
		}
	}
	private setCommands(level:number):string[] {
		var fs = require("fs");
		var commandsJSON = fs.readFileSync("./data/commands.json");
		var commands = JSON.parse(commandsJSON);
		var commandsList = [];
		commands.list.map(function(element, index) {
			if(+element.level <= level) {
				commandsList.push({
					id: element.id,
					command: element.command,
					commandAlt: element.commandAlt,
					description: element.description,
					chain: element.chain?element.chain:0
				});
			}
		})
		return commandsList;
	}
}