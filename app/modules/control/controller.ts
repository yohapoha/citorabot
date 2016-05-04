declare function require(name:string);

export function messageModel(registration:boolean, msg:string, commands:any):string | Array<string> {
	if(!registration) {
		for(var i = 0; i < commands.length; i++) {
			if(commands[i].command === msg || commands[i].commandAlt === msg) {
				if(commands[i].chain != 0) {
					var messageArray:Array<string> = []
					commands[i].chain.map(function(element, index) {
						messageArray.push(getCommandString(element));
					})
					return messageArray;
				} else {
					return commands[i].output;
				}
			}
		}
		return "Команда не существует или у Вас нет доступа.";
	} else {
		return "Пожалуйста, зарегистрируйтесь в системе.";
	}
}
function getCommandString(command:any):string {
	var commandString = command.command+" ("+command.commandAlt+") - "+command.description;
	return commandString;
}