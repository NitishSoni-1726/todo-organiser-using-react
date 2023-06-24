import React from "react";
import Task from "./Task";
export default function TaskList(props) {
  return props.task.map((task, i) => {
    return (
      <Task
        key={task.content}
        index={i}
        task={task}
        onDelete={() => props.onDelete(i)}
        onSave={props.onSave}
        onStatusChange={props.onStatusChange}
        onSaveClick={props.onSaveClick}
      />
    );
  });
}
