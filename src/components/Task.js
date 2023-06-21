import React, { useState } from "react";
export default function TaskList(props) {
  const checkRef = React.createRef();
  const taskRef = React.createRef();
  const saveButtonRef = React.createRef();
  const editButtonRef = React.createRef();
  const [taskState, setTaskState] = useState("read");

  function handleEditClick() {
    // TODO
    setTaskState("edit");
  }

  function handleSaveClick() {
    setTaskState("read");
    props.onSave(taskRef.current.innerText, props.index);
  }

  function handleEnterKeyboardClick(e) {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  }

  return (
    <div className="align-self-start w-100 mt-3">
      <div className="d-flex align-items-center w-100">
        <input
          type="checkbox"
          style={{ transform: "scale(1.5)" }}
          ref={checkRef}
          id="check-box"
          onChange={() => {
            props.onStatusChange(
              checkRef.current.checked,
              props.index,
              taskRef,
              editButtonRef
            );
          }}
        ></input>
        <div
          className="flex-grow-1 ms-3 me-2 p-1"
          style={{
            fontSize: "20px",
            textDecoration:
              props.task.status === "completed" ? "line-through" : "none",
            background: taskState === "edit" ? "white" : "transparent",
            color: taskState === "edit" ? "black" : "white",
          }}
          ref={taskRef}
          contentEditable={taskState === "edit"}
          onKeyDown={handleEnterKeyboardClick}
        >
          {props.task.content}
        </div>
        {taskState === "read" ? (
          <button
            className="btn btn-warning me-1"
            disabled={props.task.status === "completed"}
            ref={editButtonRef}
            onClick={handleEditClick}
          >
            <i className="fa fa-edit"></i>
          </button>
        ) : (
          <button
            className="btn btn-success me-1"
            ref={saveButtonRef}
            onClick={handleSaveClick}
          >
            <i className="fa fa-save"></i>
          </button>
        )}

        <button
          className="btn btn-danger"
          onClick={() => {
            props.onDelete(props.task.content);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
