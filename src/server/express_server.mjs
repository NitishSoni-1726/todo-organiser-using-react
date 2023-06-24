import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
//connection to database
const client = new MongoClient("mongodb://localhost:27017");
const databaseTodos = client.db("doit").collection("todo");
mongoose.connect("mongodb://localhost:27017/doit");
//declaring database structure
const todos = new mongoose.Schema({
  content: String,
  status: String,
  date_created: Number,
});
const todo = mongoose.model("todo", todos);
//Connection
client.connect().then(() => {
  console.log("Connected Successfully!");
});
//Express Server
const app = express();
const port = 4000;
//use this before every request
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
//Express Server Listening To  http://localhost:4000
app.listen(port, () => {
  console.log("Server Started");
});
//Welcome Message
app.get("/", (req, res) => {
  res.send("Welcome To The Todo Organiser Server");
});
//To Display Todos of Database
app.get("/api/todos", (req, res) => {
  console.log("Fetching DOIT Database from Mongo DB");
  handleTodosGet(res);
});
async function handleTodosGet(res) {
  const retrivedTodos = await todo.find();
  res.send(retrivedTodos);
}
//To Add Todo To DataBase
app.post("/api/todos", (req, res) => {
  console.log("Adding a New Task to MongoDB");
  handleTodosPost(req, res);
});
function handleTodosPost(req, res) {
  let Todo = new todo(req.body);
  Todo.save();
  res.send("Added");
}
//To Delete Todo from Database
app.delete("/api/todos", (req, res) => {
  console.log("Deleting a Task from MongoDB");
  handleTodosDelete(res, req);
});
function handleTodosDelete(res, req) {
  DeleteTodo(req, res);
}
async function DeleteTodo(req, res) {
  await todo.findOneAndRemove(req.body[0]);
  res.send("Deleted");
}
//To Update Todo from Database
app.put("/api/todos", (req, res) => {
  handleUpdateTodos(req, res);
});
async function handleUpdateTodos(req, res) {
  await todo.findOneAndUpdate(
    { date_created: req.body[0].date_created },
    { content: req.body[0].content, status: req.body[0].status }
  );
  res.send("Updated");
}
//Invalid Request
app.get("*", (req, res) => {
  console.log("Unknown URL");
  res.status(404).send("We don't serve this route");
});
