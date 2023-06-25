import { MongoClient } from "mongodb";
import mongoose from "mongoose";

//Initialize Database
export async function databaseInit() {
  if (process.env.MONGO_URI) {
    const client = new MongoClient(process.env.MONGO_URI);
    const connn = mongoose.connect(process.env.MONGO_URI);
    return client.connect();
  } else {
    throw new Error("MONGO_URI environement variable not set. Please set it.");
  }
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
