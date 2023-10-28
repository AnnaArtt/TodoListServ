import Account from "../models/Account.js";
import Member from "../models/Member.js";
import List from "../models/List.js";
import Todo from "../models/Todo.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import secret from "../config.js";

class TodoController {
  async getTodoList(req, res) {
    try {
      const memberId = req.params.listId.slice(1);

      const todo_list = await Todo.find({ userId: memberId });

      //выбрать из документа todo все todo с номером юзера и вернуть их

      return res.status(200).json({ message: "Sucsessfull", todo_list });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "List is not found" });
    }
  }

  async createTodo(req, res) {
    try {
      //validation
      const { title, description, type, status } = req.body;
      const userId = req.params.listId.slice(1);
      const todo = new Todo({
        title: title,
        description: description,
        type: type,
        status: status,
        userId: userId,
      });
      await todo.save();

      return res.status(200).json({ message: "Sucsessfull", todo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "We cann`t create new todo" });
    }
  }

  async deleteTodo(req, res) {
    try {
      const { listId } = req.params;
      const todoId = listId.slice(1);
      console.log(1);

      await Todo.findByIdAndDelete({ _id: todoId });

      console.log(2);

      // await todo.save();

      // const todo = await Lis
      return res.status(200).json({ message: "Sucsessfull" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Delete Error" });
    }
  }

  async updateTodo(req, res) {
    try {
      //validation
      console.log("there");
      const new_todo = req.body;
      if (!new_todo._id) {
        console.log("there2");
        return res.json({ message: "Id not found" });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(new_todo._id, new_todo, {
        new: true,
      });
      console.log("there3");

      return res.status(200).json({ todo: updatedTodo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Update Error" });
    }
  }
}

export default new TodoController();
