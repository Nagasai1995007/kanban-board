export const LOGIN = 'LOGIN';
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const MOVE_TASK = "MOVE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const loginAction = (user) => ({
  type: LOGIN,
  payload: user,
});

export const addTasks = (task) => ({
    type: ADD_TASK,
    payload: task,
  });
  
  export const editTasks = (taskId, updatedTask) => ({
    type: EDIT_TASK,
    payload: { taskId, updatedTask },
  });
  
  export const moveTasks = (taskId, newStage) => ({
    type: MOVE_TASK,
    payload: { taskId, newStage },
  });
  
  export const deleteTasks = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
  });
