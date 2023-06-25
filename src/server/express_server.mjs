import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import { databaseInit, Session } from "./database/DatabaseSetup.mjs";
import cookieParser from "cookie-parser";
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
app.use(express.static(path.resolve(__dirname, "../../build")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
async function sessionManagement(req, res, next) {
  const session = req.cookies?.user_session;
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    // The user might still be unauthorized.
    // 1. The session object pointed by cookie session_id is not there at all
    // 2. The session object is there but the session has expired
    const sessionId = { _id: JSON.parse(req.cookies.user_session)._id };
    const sessionObject = await Session.findOne(sessionId);
    if (sessionObject === null) {
      res.status(401).json({ error: "No Session Found" });
    } else if (
      sessionObject !== null &&
      sessionObject.expire_time < new Date().getTime()
    ) {
      res.status(401).json({ error: "Session Expired" });
    } else {
      req.session = sessionObject;
      next();
    }
  }
}
//Express Server Listening To  http://localhost:4000
app.listen(port, () => {
  console.log("Server Started");
});

//Todo Manager
//End Point To Display Todo
app.get("/api/todos", sessionManagement, (req, res) => {
  console.log("Fetching DOIT Database from Mongo DB");
  handleTodosGet(req, res);
});
//End Point To Add Todo
app.post("/api/todos", sessionManagement, (req, res) => {
  console.log("Adding a New Task to MongoDB");
  handleTodosPost(req, res);
});
//End Point To Delete Todo
app.delete("/api/todos", sessionManagement, (req, res) => {
  console.log("Deleting a Task at MongoDB");
  handleTodosDelete(res, req);
});
//End Point To Update Todo from Database
app.put("/api/todos", sessionManagement, (req, res) => {
  console.log("Updating a Task at MongoDB");
  handleUpdateTodos(req, res);
});

//User Manager
//End Point To add New User
app.post("/api/user", (req, res) => {
  handleRegister(req, res);
});
//To Check User
app.post("/api/authenticate", (req, res) => {
  handleLogin(req, res);
});
//Welcome Page
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});
