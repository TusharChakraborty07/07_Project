require("dotenv").config();

const express = require("express");

const userModel = require("./models/user.model");
const todoModel = require("./models/todo.model");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/todo", async (req, res) => {
  const todo = await todoModel.find();
  res.send(todo);
});

app.post("/todo/add", async (req, res) => {
  const todo = await todoModel.create({ content: req.body.todo });
  res.send("Todo added sucessfully");
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await todoModel.findById(req.params.id);

  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  //   res.send(todo);
  res.send("Todo updated sucessfully");
});

app.put("/todo/edit/:id", async (req, res) => {
  const todo = await todoModel.findByIdAndUpdate(req.params.id);

  todo.content = req.body.todo;
  await todo.save();

  res.send("Todo updated sucessfully");
});

app.delete("/todo/delete/:id", async (req, res) => {
  const todo = await todoModel.findByIdAndDelete(req.params.id);
  res.send("Todo deleted sucessfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
