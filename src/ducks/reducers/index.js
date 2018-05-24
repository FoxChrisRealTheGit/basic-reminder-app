import { ADD_REMINDER, REMOVE_REMINDER, CLEAR_REMINDERS } from "../constants"
import {bake_cookie, read_cookie} from "sfcookies"

const reminder = (action) => {
    return { 
        id: Math.random(),
        text: action.payload.text,
        dueDate: action.payload.dueDate
    }
}

const removeById=(state=[], id)=>{
    const reminders = state.filter(reminder=>reminder.id !== id)
    return reminders
}


const reminders = (state = [], action) => {
    let reminders = null;
    state = read_cookie("reminders");
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie("reminders", reminders)
            return reminders;
        case REMOVE_REMINDER:
            reminders = removeById(state, action.payload)
            bake_cookie("reminders", reminders)
            return reminders
            case CLEAR_REMINDERS:
            reminders=[];
            bake_cookie("reminders", reminder)
            return reminders
        default: return state;
    }
}


export default reminders;