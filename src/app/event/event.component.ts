import { Component, OnInit } from '@angular/core';
import { EventItem } from './eventItem';
import { EventList } from './eventList';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent  {
   title="Event List";
   eventListArray=[]
   
   

  private list=new EventList("College",this.eventListArray);
//retrieve the user name
  get userName():string{
    return this.list.user
  }

  //retrieve total elements in the array
  get itemCount():number{
    return this.list.items.length;
  }

  //get the incompleted list of tasks

  get eventItems():EventItem[]{
    return this.list.items.filter(item=> !item.complete);
  }

  //add a new item to ToDoList
  addItem(newItem:string){
  if(newItem!=""){
    this.list.addItems(newItem);
  }
  }
  }