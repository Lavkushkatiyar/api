const express = require("express");
const users = require("./data.json");
const app = express();
const PORT = 8000;
app.get("/", (request, response) => {
  console.log(request.body);
  return response.send(users);
});

app.listen(PORT, () => console.log("serverStarted : ", PORT));
