import React, { useEffect } from "react";
export default function TaskList(props) {
  const checkRef = React.createRef();
  const taskRef = React.createRef();
  const saveButtonRef = React.createRef();
  const editButtonRef = React.createRef();
  useEffect(() => {
    if (props.task.status === "completed") {
      checkRef.current.checked = "true";
      taskRef.current.style.textDecoration = "line-through";
      editButtonRef.current.disabled = true;
    }
  });
  return (
    <div className="align-self-start w-100 mt-3">
      <div className="d-flex align-items-center w-100">
        <input
          type="checkbox"
          style={{ transform: "scale(1.5)" }}
          ref={checkRef}
          onChange={() => {
            props.onStatusChange(checkRef, props.index, taskRef, editButtonRef);
          }}
        ></input>
        <div
          className="flex-grow-1 ms-3 me-2 p-1"
          style={{ fontSize: "20px" }}
          ref={taskRef}
        >
          {props.task.content}
        </div>

        <button
          className="btn btn-warning me-1"
          onClick={() => {
            saveButtonRef.current.style.display = "block";
            editButtonRef.current.style.display = "none";
            props.onEditClick(taskRef);
          }}
          ref={editButtonRef}
        >
          <i className="fa fa-edit"></i>
        </button>

        <button
          className="btn btn-success me-1"
          style={{ display: "none" }}
          onClick={() => {
            saveButtonRef.current.style.display = "none";
            editButtonRef.current.style.display = "block";
            props.onSaveClick(taskRef, props.index);
          }}
          ref={saveButtonRef}
        >
          <i className="fa fa-save"></i>
        </button>

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
