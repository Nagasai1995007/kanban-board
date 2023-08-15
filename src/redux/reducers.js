import { LOGIN } from "./actions";
import { combineReducers } from "redux";
import { ADD_TASK, EDIT_TASK, MOVE_TASK, DELETE_TASK } from "./actions";

const initialState = {
  loggedInUser: null,
};

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.taskId ? { ...task, ...action.payload.updatedTask } : task
      );
    case MOVE_TASK:
      return state.map((task) =>
        task.id === action.payload.taskId ? { ...task, stage: action.payload.newStage } : task
      );
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  loggedInUser: (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return action.payload;
      default:
        return state;
    }
  },
  tasks: tasksReducer, 
});

export default rootReducer;
