import React, { useState } from "react";
import Task from "./Task";
import "../App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
 import {addTasks,editTasks,moveTasks,deleteTasks} from '../redux/actions'



const TaskManagement = () => {

  const dispatch=useDispatch()
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editTask, setEditTask] = useState(null);
  const [newTask, setNewTask] = useState({
    name: "",
    stage: "0",
    priority: "medium",
    deadline: "",
  });

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleTaskAdd = (e) => {
    e.preventDefault();

    if (!newTask.name || !newTask.deadline) {
      setErrorMessage("Please fill in all the required fields.");
      return;
      
    }

    const newTaskWithId = { ...newTask, id: uuidv4() }; 
    dispatch(addTasks(newTaskWithId))
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      name: "",
      stage: "0",
      priority: "medium",
      deadline: "",
    });
    setShowModal(false);
    setErrorMessage("");
    
  };
  const navigate=useNavigate()
  const handleLogout=()=>{
    navigate("/")
  }

  const handleMoveTask = (task, direction) => {
    const currentStage = parseInt(task.stage);

    if (direction > 0 && currentStage < 3) {

      const newStage = currentStage + direction;
      const updatedTasks = tasks.map((t) =>
        t === task ? { ...t, stage: newStage.toString() } : t
      );
      setTasks(updatedTasks);
    } else if (direction < 0 && currentStage > 0) {

      const newStage = currentStage + direction;
      const updatedTasks = tasks.map((t) =>
        t === task ? { ...t, stage: newStage.toString() } : t
      );
      dispatch(moveTasks(task.id, newStage))
      setTasks(updatedTasks);
    }
   
    
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowModal(true);
    setNewTask({
      name: task.name,
      stage: task.stage,
      priority: task.priority,
      deadline: task.deadline,
    });
    
    
  };

  const handleEditTaskSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      name: newTask.name,
      stage: newTask.stage,
      priority: newTask.priority,
      deadline: newTask.deadline,
    };
    dispatch(editTasks(editTask.id, updatedTask));
    const updatedTasks = tasks.map((task) =>
      task === editTask ? { ...task, ...updatedTask } : task
    );

    setTasks(updatedTasks);
    setShowModal(false);
    setEditTask(null);
    setNewTask({
      name: "",
      stage: "0",
      priority: "medium",
      deadline: "",
    });
  };

  const handleDeleteTask = (task) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
      const updatedTasks = tasks.filter((t) => t !== task);
      setTasks(updatedTasks);
      }
      dispatch(deleteTasks(task.id))
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceStage = parseInt(
      result.source.droppableId.replace("stage-", "")
    );
    const destinationStage = parseInt(
      result.destination.droppableId.replace("stage-", "")
    );

    if (sourceStage === destinationStage) {

      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(result.source.index, 1);
      updatedTasks.splice(result.destination.index, 0, movedTask);

      setTasks(updatedTasks);
    } else {

      const movedTask = tasks.find((task) => task.id === result.draggableId);
      if (movedTask) {
        const updatedTasks = tasks.map((task) =>
          task.id === result.draggableId
            ? { ...task, stage: destinationStage.toString() }
            : task
        );

        setTasks(updatedTasks);
      }
    }
  };

  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.stage === "3").length;
  const pendingTasks = allTasks - completedTasks;

  return (
    <div className="App">
      <header >
        <div className="header-top d-flex justify-content-between" >
        <h1>Kanban-Board</h1>
        <button className="btn-logout btn btn-primary" onClick={handleLogout}>Log Out</button>
        </div>
        <button
          className="btn btn-primary addtask-btn"
          onClick={handleModalToggle}
        >
          + Add Task
        </button>
        <div className="task-summary">
          <p>Total Tasks: {allTasks}</p>
          <p>Completed Tasks: {completedTasks}</p>
          <p>Pending Tasks: {pendingTasks}</p>
        </div>
      </header>
      <main className="task-sections">
        <DragDropContext onDragEnd={onDragEnd}>
          {["Backlog", "To Do", "Ongoing", "Done"].map((stage, index) => (
            <Droppable key={index} droppableId={`stage-${index}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`task-section ${stage.toLowerCase()} p-3`}
                >
                  {" "}
                  <h2>{stage}</h2>
                  <div className="task-cards">
                    {tasks
                      .filter((task) => task.stage === index.toString())
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-card ${task.priority.toLowerCase()}`}
                            >
                              <Task
                                task={task}
                                onMoveTask={handleMoveTask}
                                onEditTask={handleEditTask}
                                onDeleteTask={handleDeleteTask}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </main>
      {showModal && (
        <div className="modal d-flex align-items-center justify-content-center">
          <div className="modal-content ">
            <h2>{editTask ? "Edit Task" : "Add Task"}</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={editTask ? handleEditTaskSubmit : handleTaskAdd}>
              <input
                type="text"
                placeholder="Task Name"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
              />
              <select
                value={newTask.stage}
                onChange={(e) =>
                  setNewTask({ ...newTask, stage: e.target.value })
                }
              >
                <option value="0">Backlog</option>
                <option value="1">To Do</option>
                <option value="2">Ongoing</option>
                <option value="3">Done</option>
              </select>
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) =>
                  setNewTask({ ...newTask, deadline: e.target.value })
                }
              />
              <button type="submit">
                {editTask ? "Save Changes" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
