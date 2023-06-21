import React, { useState } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import Search from "./Search";

export default function Layout() {
  const dateRef = React.createRef();
  const [taskList, setTaskList] = useState([]);
  const [duplicateTaskList, setDuplicateTaskList] = useState([]);
  const [searchDuplicate, setSearchDuplicate] = useState([]);
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
    setDuplicateTaskList(duplicateTaskList.concat(newTask));
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
    setDuplicateTaskList(newTaskList);
    updateTaskCount(newTaskList);
    setSearchDuplicate(newTaskList);
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
  function handleSearch(searchRef) {
    let searchedArray = [];
    if (searchRef.current.value === "") {
      setDuplicateTaskList(searchDuplicate);
    } else {
      for (let i = 0; i < duplicateTaskList.length; i++) {
        if (
          searchRef.current.value.toLowerCase() ===
          duplicateTaskList[i].content.toLowerCase()
        ) {
          searchedArray.push(duplicateTaskList[i]);
          setDuplicateTaskList(searchedArray);
        }
      }
    }
  }
  function handleCompletedTask() {
    let completedArray = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].status === "completed") {
        completedArray.push(taskList[i]);
      }
      setDuplicateTaskList(completedArray);
      setSearchDuplicate(completedArray);
    }
  }
  function handleRemainingTask() {
    let remainingArray = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].status === "not_completed") {
        remainingArray.push(taskList[i]);
      }
      setDuplicateTaskList(remainingArray);
      setSearchDuplicate(remainingArray);
    }
  }
  function handleTotalTask() {
    setDuplicateTaskList(taskList);
    setSearchDuplicate(taskList);
  }
  function handleDateSort() {
    let dateSortedArray = [];
    if (dateRef.current.value === "") {
      setDuplicateTaskList(taskList);
      setSearchDuplicate(taskList);
    } else {
      for (let i = 0; i < taskList.length; i++) {
        if (dateRef.current.value === taskList[i].date_created) {
          dateSortedArray.push(taskList[i]);
          setDuplicateTaskList(dateSortedArray);
          setSearchDuplicate(dateSortedArray);
        } else {
          setDuplicateTaskList([]);
          setSearchDuplicate([]);
        }
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
          <div className="align-self-end mt-3 d-flex flex-column">
            <input
              type="date"
              className="btn btn-secondary"
              ref={dateRef}
              onChange={handleDateSort}
            ></input>
          </div>
          <div
            className="w-100 taskl-list mt-2"
            style={{ height: "50vh", overflowY: "scroll", overflowX: "hidden" }}
          >
            {taskList.map((task, i) => {
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
              onClick={handleCompletedTask}
            >
              Completed Task: {completedTaskCount}
            </button>
            <button
              className="btn btn-danger"
              style={{ fontWeight: "700", fontSize: "14px" }}
              onClick={handleRemainingTask}
            >
              Remaining Task: {remainingTaskCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
