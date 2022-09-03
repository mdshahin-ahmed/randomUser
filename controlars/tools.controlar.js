const fs = require("fs");

const getUserData = () => {
  const jsonData = fs.readFileSync("users.json");
  return JSON.parse(jsonData);
};

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("users.json", stringifyData);
};

module.exports.getAllUsers = (req, res, next) => {
  const allUsers = getUserData();
  res.send(allUsers);
};
module.exports.randomUser = (req, res, next) => {
  const allUsers = getUserData();
  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
  res.send({ allUsers: randomUser });
};

module.exports.addUser = (req, res, next) => {
  const existUsers = getUserData();
  const userData = req.body;
  existUsers.push(userData);
  saveUserData(existUsers);
  res.send(saveUserData);
};
module.exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  const existUsers = getUserData();
  const filterUser = existUsers.filter((user) => user.id !== Number(id));
  if (existUsers.length === filterUser.length) {
    res.send("user is not exist");
  }
  saveUserData(filterUser);
  res.send(saveUserData);
};
