import React, { useState, useContext } from "react";
import { AppContext } from "./Layout";

export default function Task(props) {
  const { onSave } = useContext(AppContext);
  const { onDelete } = useContext(AppContext);
  const { onStatusChange } = useContext(AppContext);
  const checkRef = React.createRef();
  const taskRef = React.createRef();
  const saveButtonRef = React.createRef();
  const editButtonRef = React.createRef();
  const [taskState, setTaskState] = useState("read");

  function handleEditClick() {
    setTaskState("edit");
  }

  function handleSaveClick() {
    setTaskState("read");
    onSave(taskRef.current.innerText, props.index);
  }

  function handleEnterKeyboardClick(e) {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  }

  return (
    <div className="align-self-start w-100 mt-3" data-testid="task">
      <div className="d-flex align-items-center w-100">
        <input
          type="checkbox"
          style={{ transform: "scale(1.5)" }}
          ref={checkRef}
          onChange={() => {
            onStatusChange(checkRef.current.checked, props.index);
          }}
          checked={props.task.status === "completed"}
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
          title="Delete"
          onClick={() => {
            onDelete(props.index);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
