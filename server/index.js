const express = require("express");
const router = require("./Routers/userRoute");
const cors = require("cors");
const studentRouter = require("./Routers/studentRoute");
const teacherRouter = require("./Routers/teacherRoute");
require("./db");

const app = express();
app.use(
  cors({
    origin: "https://deploy-mern.vercel.app",
    methods:["POST", "GET"],
    credentials: true,
  })
);
// app.use(cors())
app.use(express.json());
app.use("/api/user", router);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
