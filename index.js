const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const dbConnect = require("./utils/bdConnect.js");
const toolsRoutes = require("./routes/v1/tools.route.js");
const viewCount = require("./middleWare/viewCount");
const errorHandler = require("./middleWare/errorHandler");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs"); // 9:00

// app.use(viewCount);

// Apply the rate limiting middleware to all requests
// app.use(limiter);

dbConnect();

app.use("/user", toolsRoutes);

app.get("/", (req, res) => {
  // res.send("Hello World");
  // res.sendFile(__dirname + "/public/test.html");
  res.render("home.ejs", {
    id: 5,
    user: {
      name: "Shahin",
    },
  });
});
app.all("*", (req, res) => {
  res.send("No route found!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});