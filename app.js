const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { url: process.env.REDIR_URL });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
