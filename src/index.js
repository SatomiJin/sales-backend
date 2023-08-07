const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const Cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

const port = process.env.PORT || 3002;
app.use(Cors());
app.use(express.json({ limit: "50mb", extended: true }));

app.use(cookieParser());
routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port", +port);
});
