import React, { useState } from "react";
export default function AddTask(props) {
  const [error, setError] = useState(null);
  const inputRef = React.createRef();
  const formRef = React.createRef();
  function formSubmit(event) {
    event.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.trim()) {
        props.onAddTask(inputRef.current.value);
        setError(null);
      } else {
        setError("Please Enter Something");
      }
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }
  return (
    <div className="w-100">
      <form
        name="newtask"
        ref={formRef}
        onSubmit={formSubmit}
        className="d-flex justify-content-center align-items-center"
      >
        <input
          type="text"
          className="w-100 rounded p-1 me-2 bg-transparent text-light border border-2"
          ref={inputRef}
        ></input>
        <button className="btn btn-success" type="submit">
          +
        </button>
      </form>
      {error ? (
        <div
          style={{ display: "flex", justifyContent: "center", color: "red" }}
        >
          {error}
        </div>
      ) : null}
    </div>
  );
}
