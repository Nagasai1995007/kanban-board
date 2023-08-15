import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./Task.css"

const Task = ({ task, onMoveTask, onEditTask, onDeleteTask }) => {
  return (
    <div className="task">
      <h3 className='task-name'title={task.name}>{task.name}</h3>
      <p>Stage: {task.stage}</p>
      <p>Priority: {task.priority}</p>
      <p>Deadline: {task.deadline}</p>
      <div className="task-buttons">
  <button
    className="btn btn-outline-primary btn-sm me-2"
    onClick={() => onMoveTask(task, -1)}
  >
    <FontAwesomeIcon icon={faArrowLeft} />  
  </button>
  <button
    className="btn btn-outline-info btn-sm me-2"
    onClick={() => onEditTask(task)}
  >
    <FontAwesomeIcon icon={faEdit} /> 
  </button>
  <button
    className="btn btn-outline-danger btn-sm me-2"
    onClick={() => onDeleteTask(task)}
  >
    <FontAwesomeIcon icon={faTrash} /> 
  </button>
  <button
    className="btn btn-outline-primary btn-sm"
    onClick={() => onMoveTask(task, 1)}
  >
    <FontAwesomeIcon icon={faArrowRight} /> 
  </button>
</div>

    </div>
  );
};

export default Task;
