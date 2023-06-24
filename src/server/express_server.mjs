import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import crypto from "crypto";
//connection to database
const client = new MongoClient("mongodb://localhost:27017");
mongoose.connect("mongodb://localhost:27017/doit");
//declaring Todo database structure
const todos = new mongoose.Schema({
  content: String,
  status: String,
  date_created: Number,
});
const todo = mongoose.model("todo", todos);
//declaring User database structure
const user = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
});
const Users = mongoose.model("users", user);
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
// app.use(cors());
//Express Server Listening To  http://localhost:4000
app.listen(port, () => {
  console.log("Server Started");
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.resolve(__dirname, "../../build")));
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

//User Manager
//To add new User
app.post("/api/user", (req, res) => {
  handleUserPost(req, res);
});
async function handleUserPost(req, res) {
  const userList = await Users.findOne({ Email: req.body.Email });
  if (userList === null) {
    req.body.Password = crypto
      .createHash("md5")
      .update(req.body.Password)
      .digest("hex");
    let User = new Users(req.body);
    User.save();
    res.json({ status: "success" });
  } else {
    res.json({ error: "User Already Registered" });
  }
}
//To Check User
app.post("/api/checkUser", (req, res) => {
  handleCheckUser(req, res);
});
async function handleCheckUser(req, res) {
  const userList = await Users.findOne({ Email: req.body.Email });
  const Password = crypto
    .createHash("md5")
    .update(req.body.Password)
    .digest("hex");
  if (userList === null) {
    res.json({ error: "User Not Found" });
  } else {
    if (userList.Email === req.body.Email && userList.Password === Password) {
      res.json({ status: "success" });
    } else {
      res.json({ error: "Invalid Password" });
    }
  }
}
//Welcome Page
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});
