declare function require(name:string);

interface iUser {
   id:number;
   level:number;
}
export class User implements iUser { 
    id:number = 0;
    level:number = 0;
    constructor(id:number) {
        this.id = id;
        this.level = this.setLevel(id);
    }
    private setLevel(id:number):number {
        var fs = require("fs");
        var usersJSON = fs.readFileSync("./data/users.json");
        var users = JSON.parse(usersJSON);
        for(var i = 0; i < users.list.length; i++) {
            if(users.user[i].id === id) {
                return users.list[i].level;
            }
        }
    }
    private setCommands():Array<string> {
        return [];
    }
}