import { Session, Todo } from "./DatabaseSetup.mjs";

export async function handleTodosGet(req, res) {
  const userId = await getUserIdFromSession(req);
  const retrivedTodos = await Todo.find({ user_id: userId });
  res.json(retrivedTodos);
}

async function getUserIdFromSession(req) {
  const session = await Session.find(JSON.parse(req.cookies.user_session));
  const userId = session[0].user_id;
  return userId;
}

export async function handleTodosPost(req, res) {
  const userId = await getUserIdFromSession(req);
  req.body.user_id = userId;
  let todo = new Todo(req.body);
  todo.save();
  res.send("Added");
}

export async function handleTodosDelete(res, req) {
  const userId = await getUserIdFromSession(req);
  await Todo.findOneAndRemove({ _id: req.body[0]._id, user_id: userId });
  res.send("Deleted");
}

export async function handleUpdateTodos(req, res) {
  const userId = getUserIdFromSession(req);
  await Todo.findOneAndUpdate(
    { date_created: req.body.date_created, user_id: userId },
    { content: req.body.content, status: req.body.status }
  );
  res.send("Updated");
}
