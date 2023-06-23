import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import Search from "./Search";

export default function Layout() {
  const [searchStr, setSearchStr] = useState("");
  const [completeFilter, setCompleteFilter] = useState(false);
  const [remainingFilter, setRemainingFilter] = useState(false);
  const [ascendingSort, setAscendingSort] = useState(false);
  const [descendingSort, setDescendingSort] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // TODO: Fetch todolist
    async function fetchTodos() {
      let response = await fetch("http://localhost:4000/api/todos");
      let data = await response.text();
      setTaskList(JSON.parse(data));
    }
    fetchTodos();
  }, []);
  function handlePostTodos(Todo) {
    fetch(`http://localhost:4000/api/add-todo`, {
      method: "POST",
      body: JSON.stringify(Todo),
    });
  }
  function handleAddTask(newTaskContent) {
    let newTask = {
      content: newTaskContent,
      status: "not_completed",
      date_created: new Date().getTime(),
    };
    setTaskList(taskList.concat(newTask));
    handlePostTodos(newTask);
  }
  function handleDelete(index) {
    const firstPart = taskList.slice(0, index);
    const secondPart = taskList.slice(index + 1, taskList.length);
    setTaskList(firstPart.concat(secondPart));
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
  function handleSortAscending() {
    setAscendingSort(true);
    setDescendingSort(false);
  }
  function handleSortDescending() {
    setDescendingSort(true);
    setAscendingSort(false);
  }
  let filteredTasks = taskList;
  // Derived state. Don't need to store it in state using useState.
  if (ascendingSort) {
    for (let i = 1; i < taskList.length; i++) {
      for (let j = 0; j < i; j++) {
        if (taskList[i].date_created > taskList[j].date_created) {
          let x = taskList[i];
          taskList[i] = taskList[j];
          taskList[j] = x;
        }
      }
    }
    filteredTasks = taskList;
  }
  if (descendingSort) {
    for (let i = 1; i < taskList.length; i++) {
      for (let j = 0; j < i; j++) {
        if (taskList[i].date_created < taskList[j].date_created) {
          let x = taskList[i];
          taskList[i] = taskList[j];
          taskList[j] = x;
        }
      }
    }
    filteredTasks = taskList;
  }
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
          <div className="d-flex justify-content-end mt-3 w-100 align-items-center">
            <div className="me-1 text-light" style={{ fontWeight: "700" }}>
              Date Created
            </div>
            <button
              className="btn btn-secondary btn-sm me-1"
              onClick={() => {
                handleSortAscending();
              }}
            >
              <i className="fa fa-arrow-up"></i>
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                handleSortDescending();
              }}
            >
              <i className="fa fa-arrow-down"></i>
            </button>
          </div>
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
