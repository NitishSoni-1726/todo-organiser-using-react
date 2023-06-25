import { Todo } from "./DatabaseSetup.mjs";

export async function handleTodosGet(req, res) {
  const retrivedTodos = await Todo.find({ user_id: userId });
  res.json(retrivedTodos);
}

export async function handleTodosPost(req, res) {
  const userId = req.session.user_id;
  req.body.user_id = userId;
  let todo = new Todo(req.body);
  todo.save();
  res.send("Added");
}

export async function handleTodosDelete(res, req) {
  const userId = req.session.user_id;
  await Todo.findOneAndRemove({ _id: req.body[0]._id, user_id: userId });
  res.send("Deleted");
}

export async function handleUpdateTodos(req, res) {
  const userId = req.session.user_id;
  await Todo.findOneAndUpdate(
    { date_created: req.body.date_created, user_id: userId },
    { content: req.body.content, status: req.body.status }
  );
  res.send("Updated");
}
