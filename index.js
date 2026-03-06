const express = require("express");
const users = require("./data.json");

const fs = require("fs");

const app = express();
const PORT = 8000;

app.get("/", (request, response) => {
  console.log(request.body);
  return response.json(users);
});
const getHandler = (request, response) => {
  const id = Number(request.params.id);
  const user = users.find((user) => user.id === id);
  return response.json(user);
};

const patchHandler = (request, response) => {};

const deleteHandler = (request, response) => {};

app.route("/:id").get(getHandler).patch(patchHandler).delete(deleteHandler);

app.use(express.urlencoded({ extended: false }));
app.post("/", async (request, response) => {
  const body = request.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./data.json", JSON.stringify(users), (err, res) => {
    return res.send({ status: "pending" });
  });
});

app.listen(PORT, () => console.log("serverStarted : ", PORT));
