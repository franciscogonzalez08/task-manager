// Requires
const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasks);

app.get("/", (_req, res) => {
  res.send("Task Manager App");
});

// If we get a successfull connection with MongoDB, then, we can start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server at port ${PORT} is running...`));
  } catch (error) {
    console.log(error);
  }
};

start();
