import http from "http";
import express from "express";
const app = express();
let port = 4000;
let hostname = "127.0.0.1";
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
function handleOption(res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.end();
}
function handleServerStart(res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Welcome To Nitish's Server");
}
function handleTodosGet(res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(todos));
}
function handleTodosPost(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  let newTodo = "";
  req.on("data", (chunk) => {
    newTodo += chunk.toString();
  });
  req.on("end", () => {
    todos.push(JSON.parse(newTodo));
    res.end("Added");
  });
}

function getQueryParams(url) {
  const queryParamsStr = url.split("?");
  const queryParams = queryParamsStr[1]
    .split("&")
    .map((keyValStr) => keyValStr.split("="))
    .map(([key, val]) => ({ [key]: val }));

  return queryParams.reduce((acc, qp) => ({ ...acc, ...qp }), {});
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
function handleTodosDelete(res, req) {
  const index = getQueryParams(req.url).index;
  console.log(index);
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, DELETE");
  todos = DeleteTodo(index);
  res.end("Deleted");
}
function handlePageNotFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end("Page Not Found");
}

const server = http.createServer((req, res) => {
  console.log("Got request", req.url, req.method);
  if (req.url === "/") {
    handleServerStart(res);
  } else if (req.url === "/api/todos" && req.method === "GET") {
    handleTodosGet(res);
  } else if (req.url === "/api/add-todo" && req.method === "POST") {
    handleTodosPost(req, res);
  } else if (req.method === "OPTIONS") {
    handleOption(res);
  } else if (
    req.url.startsWith("/api/delete-todo") &&
    req.method === "DELETE"
  ) {
    handleTodosDelete(res, req);
  } else {
    handlePageNotFound(res);
  }
});

server.listen(port, hostname, () => {
  console.log("Server Started");
});
