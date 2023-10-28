import express from "express";
import mongoose from "mongoose";
import authorizationRouter from "./routes/authorizationRouter.js";
import memberRouter from "./routes/memberRouter.js";
import todoRouter from "./routes/todoRouter.js";
import corsMiddleware from "./middleware/corsMiddleware.js";

const PORT = 8081;
const DB_URL = `mongodb+srv://user:user@cluster0.ksn2pvs.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use(corsMiddleware);

app.use("/authorization", authorizationRouter);
app.use("/member", memberRouter);
app.use("/todo", todoRouter);
app.use((req, res) => {
  if (req.method == "OPTIONS") {
    res.status(400).json({ message: "Error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).json("Server working now");
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log("SERVER STARTED ON PORT " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
