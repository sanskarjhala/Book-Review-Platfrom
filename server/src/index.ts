import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import userRoutes from "./routes/user.routes";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", bookRoutes);
app.use("/", userRoutes);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`server is running at port number ${port}`);
});
