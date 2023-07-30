import { Action, State } from "@ngrx/store";
// import * as console from "console";

//Declare the action types
export const INCREMENT ='INCREMENT';
export const DECREMENT='DECREMENT';

//let the initial value of the counter(state)
export function counterReducer(state=0, action:Action ){
    switch (action.type) //checka the action type
    {
    case INCREMENT: //update state by incrementing the counter
        // console.log("reducer is called for increment",state)
        return state+1;
    case DECREMENT: //update state by decrementing the counter
    // console.log("reducer is called for decrement",state);
        return state-1;
    default:
        return state; //return the existing state if an unknown action is provided
    }
}