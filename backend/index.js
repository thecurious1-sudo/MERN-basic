const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

let arr = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("HELLOOO MF!");
});
app.get("/comments", (req, res) => {
  res.json({ comments: arr });
});
app.post("/comments/new", (req, res) => {
  console.log(req.body);
  try {
    arr.push(req.body.comment);
    res.json({ result: "ok" });
  } catch (e) {
    res.json({ result: e });
  }
  console.log(arr);
});
app.patch("/comments/:id", (req, res) => {
  const id = +req.params.id;
  if (id < arr.length) {
    arr[id] = req.body.comment;

    res.json({ result: "ok" });
  } else res.status(404).send("ID NOT FOUND!");
});
app.delete("/comments/:id", (req, res) => {
  const id = +req.params.id;
  if (id < arr.length) {
    arr.splice(id, 1);
    res.json({ result: "ok" });
  } else res.status(404).send("ID NOT FOUND!");
});

app.listen(300, () => {
  console.log("SERVER STARTED at PORT 300");
});
