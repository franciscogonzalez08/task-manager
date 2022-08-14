// Requires
const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("dotenv").config();

const app = express();
const PORT = 3000;

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "Project made as part of the BAP Corporativo interview process",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// Middlewares
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
