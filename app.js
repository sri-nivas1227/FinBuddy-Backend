import express from "express";
import apiRouter from "./routes/index.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://finbuddy-frontend.netlify.app",
];
app.use(cors());
app.use(
  cors({
    allowedOrigins: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to FinBuddy!</h1>");
});
export default app;
