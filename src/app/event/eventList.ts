import { EventItem } from "./eventItem"

export class EventList{
    constructor(public user:string,private toDoItems:EventItem[]){

    }

//create a new todo item and add it to the array
    addItems(task:string){
        this.items.push(new EventItem(task))
    }
//retrieve all the todo items
get items():EventItem[]{
    return this.items;
}
}