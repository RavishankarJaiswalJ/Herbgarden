import { Component, OnInit } from '@angular/core';
import { ToDoItem } from './toDoitem';
import { ToDoList } from './toDoList';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class ToDoComponent  {
   title="My To Do List";
   toDoListArray=[new ToDoItem("Morning walk",true),
   new ToDoItem("Get vegetables"),
   new ToDoItem("Book Ticket")];

  private list=new ToDoList("Alice",this.toDoListArray);
//retrieve the user name
  get userName():string{
    return this.list.user
  }

  //retrieve total elements in the array
  get itemCount():number{
    return this.list.items.length;
  }

  //get the incompleted list of tasks

  get toDoItems():ToDoItem[]{
    return this.list.items.filter(item=> !item.complete);
  }

  //add a new item to ToDoList
  addItem(newItem:string){
  if(newItem!=""){
    this.list.addItems(newItem);
  }
  }
  }
