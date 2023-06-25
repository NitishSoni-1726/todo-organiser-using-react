import { MongoClient } from "mongodb";
import mongoose from "mongoose";
//Initialize Database
export async function databaseInit() {
  const client = new MongoClient("mongodb://localhost:27017");
  mongoose.connect("mongodb://localhost:27017/doit");
  return client.connect();
}
//declaring Todo database structure
const todos = new mongoose.Schema({
  user_id: String,
  content: String,
  status: String,
  date_created: Number,
});
export const Todo = mongoose.model("todo", todos);
//declaring User database structure
const user = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
});
export const Users = mongoose.model("users", user);
//declaring Session database structure
const session = new mongoose.Schema({
  user_id: String,
  expire_time: Number,
  create_time: Number,
});
export const Session = mongoose.model("sessions", session);
