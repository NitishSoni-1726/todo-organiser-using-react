import React, { useContext } from "react";
import Task from "./Task";
import { AppContext } from "./Layout";

export default function TaskList(props) {
  const { todos } = useContext(AppContext);
  return todos.map((task, i) => {
    return <Task key={task.content} index={i} task={task} />;
  });
}
