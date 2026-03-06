const express = require("express");
const users = require("./data.json");

const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  console.log(request.body);
  return response.json(users);
});

const getHandler = (request, response) => {
  const id = Number(request.params.id);
  const user = users.find((user) => user.id === id);
  return response.json(user);
};

const postHandler = (request, response) => {
  const body = request.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./data.json", JSON.stringify(users), (err, res) => {
    return res.send({ status: "pending" });
  });
};

const patchHandler = (request, response) => {
  const body = request.body;
  const userIndex = users.findIndex(
    (user) => Number(user.id) === Number(body.id),
  );
  users[userIndex] = body;
  fs.writeFile("./data.json", JSON.stringify(users), (err, res) => {
    return res.send({ status: "pending" });
  });
};

const deleteHandler = (request, response) => {
  const body = request.body;
  const userIndex = users.findIndex(
    (user) => Number(user.id) === Number(body.id),
  );

  users.splice(userIndex, 1);
  fs.writeFile("./data.json", JSON.stringify(users), (err, res) => {
    return res.send({ status: "pending" });
  });
};

app.route("/").post(postHandler).patch(patchHandler).delete(deleteHandler);

app.route("/:id").get(getHandler);

app.listen(PORT, () => console.log("serverStarted : ", PORT));
