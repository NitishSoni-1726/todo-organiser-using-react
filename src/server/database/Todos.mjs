import { Todo } from "./DatabaseSetup.mjs";

export async function handleTodosGet(res) {
  const retrivedTodos = await Todo.find();
  res.send(retrivedTodos);
}

export function handleTodosPost(req, res) {
  let todo = new Todo(req.body);
  todo.save();
  res.send("Added");
}

export async function handleTodosDelete(res, req) {
  await Todo.findOneAndRemove(req.body[0]);
  res.send("Deleted");
}

export async function handleUpdateTodos(req, res) {
  await Todo.findOneAndUpdate(
    { date_created: req.body.date_created },
    { content: req.body.content, status: req.body.status }
  );
  res.send("Updated");
}
