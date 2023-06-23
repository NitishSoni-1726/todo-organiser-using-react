import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = 4000;
const hostname = "localhost";

let todos = [
  {
    content: "First Fetched Todo",
    status: "not_completed",
    date_created: 1687496736947,
  },
  {
    content: "Second Fetched Todo",
    status: "not_completed",
    date_created: 1687496706947,
  },
  {
    content: "Third Fetched Todo",
    status: "completed",
    date_created: 1687496726947,
  },
  {
    content: "Fourth Fetched Todo",
    status: "not_completed",
    date_created: 1687496716947,
  },
  {
    content: "Fifth Fetched Todo",
    status: "completed",
    date_created: 1687496696947,
  },
];

function getQueryParams(url) {
  const queryParamsStr = url.split("?");
  const queryParams = queryParamsStr[1]
    .split("&")
    .map((keyValStr) => keyValStr.split("="))
    .map(([key, val]) => ({ [key]: val }));

  return queryParams.reduce((acc, qp) => ({ ...acc, ...qp }), {});
}

function handleTodosPost(req, res) {
  const newTodo = req.body;
  todos.push(newTodo);
  res.send("Added");
}

function DeleteTodo(index) {
  let updatedTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (i === Number(index)) {
    } else {
      updatedTodos.push(todos[i]);
    }
  }
  return updatedTodos;
}

function handleOption(res) {
  res.statusCode = 200;
  res.end();
}

function handleTodosGet(res) {
  res.json(todos);
  res.send("Fetched");
}

function handleTodosDelete(res, req) {
  const index = req.params.todoIndex;
  todos = DeleteTodo(index);
  res.send("Deleted");
}

function handleUpdateTodos(req, res) {
  todos = req.body;
  res.send("Updated");
}

app.use(bodyParser.json());
app.use(cors());

app.options("*", (req, res) => {
  handleOption(res);
});

app.get("/", (req, res) => {
  res.send("Welcome To The Todo Organiser Server");
});

app.get("/api/todos", (req, res) => {
  handleTodosGet(res);
});

app.post("/api/todos", (req, res) => {
  handleTodosPost(req, res);
});

// Our PUT method is only supported for updating
app.put("/api/todos", (req, res) => {
  handleUpdateTodos(req, res);
});

app.delete("/api/todos/:todoIndex", (req, res) => {
  handleTodosDelete(res, req);
});

app.get("*", (req, res) => {
  res.status(404).send("We don't serve this route");
});

app.listen(port, hostname, () => {
  console.log("Server Started");
});
