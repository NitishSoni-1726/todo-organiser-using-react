import React, { useState } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import Search from "./Search";

export default function Layout() {
  const [searchStr, setSearchStr] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedTaskCount, setcompletedTaskCount] = useState(0);
  const [remainingTaskCount, setremainingTaskCount] = useState(0);

  function handleAddTask(newTaskContent) {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = currentYear + "-" + currentMonth + "-" + currentDay;
    let newTask = {
      content: newTaskContent,
      status: "not_completed",
      date_created: currentDate,
    };
    setTaskList(taskList.concat(newTask));
    updateTaskCount(taskList.concat(newTask));
  }
  function handleDelete(index) {
    let newTaskList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (i === index) {
      } else {
        newTaskList.push(taskList[i]);
      }
    }
    setTaskList(newTaskList);
    updateTaskCount(newTaskList);
  }
  function handleSave(value, index) {
    taskList[index].content = value;
    setTaskList([...taskList]);
  }
  function updateTaskCount(array) {
    if (array.length === 0) {
      setcompletedTaskCount(0);
      setremainingTaskCount(0);
    } else {
      let completedArray = [];
      let remainingArray = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].status === "completed") {
          completedArray.push(array[i]);
        } else if (array[i].status === "not_completed") {
          remainingArray.push(array[i]);
        }
        setcompletedTaskCount(completedArray.length);
        setremainingTaskCount(remainingArray.length);
      }
    }
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

  let filteredTasks = taskList;
  // Derived state. Don't need to store it in state using useState.
  if (searchStr) {
    filteredTasks = [];

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].content.toLowerCase().includes(searchStr.toLowerCase())) {
        filteredTasks.push(taskList[i]);
      }
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
            {/* <button
              className="btn btn-warning"
              style={{ fontWeight: "700", fontSize: "14px" }}
              onClick={handleTotalTask}
            >
              Task Count: {taskList.length}
            </button> */}
            <button
              className="btn btn-success"
              style={{ fontWeight: "700", fontSize: "14px" }}
            >
              Completed Task: {completedTaskCount}
            </button>
            <button
              className="btn btn-danger"
              style={{ fontWeight: "700", fontSize: "14px" }}
            >
              Remaining Task: {remainingTaskCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
