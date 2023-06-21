import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import Search from "./Search";

export default function Layout() {
  const [searchStr, setSearchStr] = useState("");
  const [completeFilter, setCompleteFilter] = useState(false);
  const [remainingFilter, setRemainingFilter] = useState(false);
  const [taskList, setTaskList] = useState([]);

  function handleAddTask(newTaskContent) {
    let newTask = {
      content: newTaskContent,
      status: "not_completed",
      date_created: new Date().getTime(),
    };
    setTaskList(taskList.concat(newTask));
  }
  function handleDelete(index) {
    let newTaskList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (i !== index) {
        newTaskList.push(taskList[i]);
      }
    }
    setTaskList(newTaskList);
  }
  function handleSave(value, index) {
    taskList[index].content = value;
    setTaskList([...taskList]);
  }
  function handleStatusChange(checked, index) {
    if (checked) {
      taskList[index].status = "completed";
    } else {
      taskList[index].status = "not_completed";
    }
    setTaskList([...taskList]);
  }
  function handleSearch(searchStr) {
    setSearchStr(searchStr.trim());
  }

  function handleFilterCompleted() {
    setCompleteFilter(true);
    setRemainingFilter(false);
  }
  function handleFilterRemaining() {
    setRemainingFilter(true);
    setCompleteFilter(false);
  }
  function handleShowAllTask() {
    setRemainingFilter(false);
    setCompleteFilter(false);
  }

  let filteredTasks = taskList;
  // Derived state. Don't need to store it in state using useState.

  if (completeFilter) {
    filteredTasks = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].status === "completed") {
        filteredTasks.push(taskList[i]);
      }
    }
  }
  if (remainingFilter) {
    filteredTasks = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].status === "not_completed") {
        filteredTasks.push(taskList[i]);
      }
    }
  }
  if (searchStr) {
    const filteredTasksTemp = [...filteredTasks];
    filteredTasks = [];
    for (let i = 0; i < filteredTasksTemp.length; i++) {
      if (
        filteredTasksTemp[i].content
          .toLowerCase()
          .includes(searchStr.toLowerCase())
      ) {
        filteredTasks.push(filteredTasksTemp[i]);
      }
    }
  }
  const taskCount = filteredTasks.length;
  let completedTaskCount = filteredTasks.filter(
    (task) => task.status === "completed"
  ).length;
  let remainingTaskCount = 0;

  for (let i = 0; i < filteredTasks.length; i++) {
    if (filteredTasks[i].status === "not_completed") {
      remainingTaskCount++;
    }
  }

  return (
    <div>
      <div className="w-100 text-center bg-dark text-light p-3">
        <h1>To Do Organiser</h1>
      </div>
      <div className="d-flex justify-content-center bg-dark content">
        <div className="d-flex flex-column align-items-center border w-50 p-4 m-4 rounded main-content text-light">
          <AddTask onAddTask={handleAddTask} />
          <Search onSearch={handleSearch} />
          <div
            className="w-100 taskl-list mt-2"
            style={{ height: "50vh", overflowY: "scroll", overflowX: "hidden" }}
          >
            {filteredTasks.map((task, i) => {
              return (
                <Task
                  key={task.content}
                  index={i}
                  task={task}
                  onDelete={() => handleDelete(i)}
                  onSave={handleSave}
                  onStatusChange={handleStatusChange}
                  onSaveClick={handleSave}
                />
              );
            })}
          </div>
          <div className="mt-3 d-flex justify-content-between w-100">
            <button
              className="btn btn-warning"
              style={{ fontWeight: "700", fontSize: "14px" }}
              onClick={handleShowAllTask}
            >
              Task Count: {taskCount}
            </button>
            <button
              className="btn btn-success"
              style={{ fontWeight: "700", fontSize: "14px" }}
              onClick={handleFilterCompleted}
            >
              Completed Task: {completedTaskCount}
            </button>
            <button
              className="btn btn-danger"
              style={{ fontWeight: "700", fontSize: "14px" }}
              onClick={handleFilterRemaining}
            >
              Remaining Task: {remainingTaskCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
