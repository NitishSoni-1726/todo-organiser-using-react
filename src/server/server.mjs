import http from "http";
let port = 4000;
let hostname = "127.0.0.1";
const todos = [
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
function handleTodosPost(res) {}
function handlePageNotFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end("Page Not Found");
}

const server = http.createServer((req, res) => {
  console.log("Got request", req.url);
  if (req.url === "/") {
    handleServerStart(res);
  } else if (req.url === "/api/todos" && req.method === "GET") {
    handleTodosGet(res);
  } else if (req.url === "/api/add-todo" && req.method === "POST") {
    // TODO
    handleTodosPost(res);
  } else {
    handlePageNotFound(res);
  }
});

server.listen(port, hostname, () => {
  console.log("Server Started");
});
