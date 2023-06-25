import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import { databaseInit } from "./database/DatabaseSetup.mjs";
import {
  handleTodosDelete,
  handleTodosGet,
  handleTodosPost,
  handleUpdateTodos,
} from "./database/Todos.mjs";
import { handleLogin, handleRegister } from "./database/Users.mjs";

//Express Server
const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//Database Connection
databaseInit()
  .then(() => {
    console.log("Connected Successfully!");
  })
  .catch((e) => {
    console.log("Error connecting to database", e);
    process.exit(1);
  });

//use this before every request
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.resolve(__dirname, "../../build")));
//Express Server Listening To  http://localhost:4000
app.listen(port, () => {
  console.log("Server Started");
});

//Todo Manager
//End Point To Display Todo
app.get("/api/todos", (req, res) => {
  console.log("Fetching DOIT Database from Mongo DB");
  handleTodosGet(res);
});
//End Point To Add Todo
app.post("/api/todos", (req, res) => {
  console.log("Adding a New Task to MongoDB");
  handleTodosPost(req, res);
});
//End Point To Delete Todo
app.delete("/api/todos", (req, res) => {
  console.log("Deleting a Task at MongoDB");
  handleTodosDelete(res, req);
});
//End Point To Update Todo from Database
app.put("/api/todos", (req, res) => {
  console.log("Updating a Task at MongoDB");
  handleUpdateTodos(req, res);
});

//User Manager
//End Point To add New User
app.post("/api/user", (req, res) => {
  handleRegister(req, res);
});
//To Check User
app.post("/api/checkUser", (req, res) => {
  handleLogin(req, res);
});
//Welcome Page
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});
