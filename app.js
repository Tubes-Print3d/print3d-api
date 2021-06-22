const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const mongoose = require("mongoose");
const chalk = require("chalk");

// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const path = require("path");
const reqdir = require("./utils/async-readdir");

reqdir(path.join(__dirname, "models")).then(() => {
  const routes = require("./routes");

  app.use("/", routes);
});

app.set("port", process.env.PORT);

server.listen(app.get("port"), () =>
  console.log(
    chalk.cyanBright("Listening on port:"),
    chalk.green.bold(app.get("port"))
  )
);
