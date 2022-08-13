const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Task Manager App");
});

app.listen(PORT, console.log(`Server at port ${PORT} is running...`));
