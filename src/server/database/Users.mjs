import crypto from "crypto";
import { Session, Users } from "./DatabaseSetup.mjs";

export async function handleRegister(req, res) {
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
function CreateSession(userList) {
  let createDate = new Date().getTime();
  let expireDate = createDate + 259200000;
  let userId = userList._id;
  let sessionObject = {
    user_id: userId,
    expire_time: expireDate,
    create_time: createDate,
  };
  return sessionObject;
}

export async function handleLogin(req, res) {
  const userList = await Users.findOne({ Email: req.body.Email });
  const Password = crypto
    .createHash("md5")
    .update(req.body.Password)
    .digest("hex");
  if (userList === null) {
    res.json({ error: "User Not Found" });
  } else {
    if (userList.Email === req.body.Email && userList.Password === Password) {
      let session = new Session(CreateSession(userList));
      session.save();
      res.cookie("user_session", JSON.stringify(session));
      res.json({ status: "success" });
    } else {
      res.json({ error: "Invalid Password" });
    }
  }
}
