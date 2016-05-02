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
        var usersJSON = fs.readFileSync("./modules/authorization/users.json");
        var users = JSON.parse(usersJSON);
        return users.Levels[users.IDs.indexOf(id)];
    }
    private setCommands():Array<string> {
        return [];
    }
}