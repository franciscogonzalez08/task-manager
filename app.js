const express = require("express");
const tasks = require("./routes/tasks");
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Task Manager App");
});

app.listen(PORT, console.log(`Server at port ${PORT} is running...`));
