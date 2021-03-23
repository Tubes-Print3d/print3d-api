const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");

app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Requiring Routes
const UsersRoutes = require("./routes/users.routes");

// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const path = require("path");
const reqdir = require("./utils/async-readdir");

reqdir(path.join(__dirname, "models")).then(() => {
  // import routes
  app.use("/users", UsersRoutes);
});

// in case you want to serve images
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});

app.set("port", process.env.PORT);

app.use(accessControls);
app.use(cors());

app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get("port"), () =>
  console.log(
    chalk.cyanBright("Listening on port:"),
    chalk.green.bold(app.get("port"))
  )
);
console.log("listening on port", app.get("port"));
