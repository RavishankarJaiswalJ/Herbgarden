
import { ToDoItem } from "./toDoitem"

export class ToDoList{
    constructor(public user:string,private toDoItems:ToDoItem[]){

    }

//create a new todo item and add it to the array
    addItems(task:string){
        this.toDoItems.push(new ToDoItem(task))
    }
//retrieve all the todo items
get items():ToDoItem[]{
    return this.toDoItems;
}
}