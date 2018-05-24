import { ADD_REMINDER, REMOVE_REMINDER, CLEAR_REMINDERS } from "../constants";


export const addReminder = (text, dueDate) => {
    const action = {
        type: ADD_REMINDER,
        payload: {
            text,
            dueDate
        }
    }
    return action
}

export const removeReminder = (id) => {
    const action = {
        type: REMOVE_REMINDER,
        payload: id
    }
    return action
}

export const clearReminders = () =>{
    return{
        type: CLEAR_REMINDERS
    }
}