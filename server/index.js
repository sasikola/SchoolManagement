const express = require("express");
const router = require("./Routers/userRoute");
const cors = require("cors");
const studentRouter = require("./Routers/studentRoute");
const teacherRouter = require("./Routers/teacherRoute");
require("./db");

const app = express();
// app.use(
//   cors({
//     origin: ["https://school-mngmt.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://school-mngmt.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(express.json());
app.use("/api/user", router);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
