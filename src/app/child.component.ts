import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DECREMENT, INCREMENT } from "./ngrx/reducer";

@Component({
    selector:'app-child',
    template:`<div>
    <h1> Child component </h1>
    <h3> The counter in child is {{childCounter$ | async}} </h3>
    </div>`
})
export class ChildComponent{
    childCounter$!:Observable<number>;
    
    constructor(private store:Store<any>){
        this.childCounter$=store.select('counterState');
        setTimeout(()=>this.store.dispatch({type:INCREMENT}),5000)
      }

      increment(){
        this.store.dispatch({type:INCREMENT})
        
      }
      decrement(){
        this.store.dispatch({type:DECREMENT});
      }


}