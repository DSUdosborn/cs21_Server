

// import express framework
const express = require("express");

const store = require("./model");

const app = express();

const portNum = process.argv[2] || 8080;

app.use(express.json({}));

app.get('/', (req, res) => {
  res.setHeader("Content-Type","application/json");
  console.log("Processing GET Request");
  res.send(JSON.stringify(store));
});

app.get('/todo/:id', (req, res) => {
  res.setHeader("Content-Type","application/json");
  console.log("Processing  get id Request");
  res.send(`Here is your task ${req.params.id}`);
});

app.post('/todo', (req, res) => {
  res.setHeader("Content-Type","application/json");
  console.log("Processing POST Request");

  store[req.body.id] = req.body;
  res.send(JSON.stringify(store[req.body.id]));
});

app.delete('/todo/:id', (req, res) => {
  console.log("Processing DELETE Request");
  res.send(`Deleted ${req.params.id}`);
});

app.patch('/todo/:id', (req, res) => {
  console.log("Processing PATCH Request");
  res.send(`Patched ${req.params.id}`);
});

app.put('/todo/:id', (req, res) => {
  console.log("Processing PUT Request");
  res.send(`Put ${req.params.id}`);
});

app.listen(portNum, () => {
  console.log(`Server listening at http://localhost:${portNum}`);
});
