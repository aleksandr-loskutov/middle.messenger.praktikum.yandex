const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist")));

const indexPath = path.join(__dirname, "dist", "index.html");
app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

const start = async () => {
  try {
    http.createServer(app).listen(PORT, () => {
      console.log("http server started on port", PORT);
    });
  } catch (e) {
    console.log("ошибка", e);
  }
};
start();
