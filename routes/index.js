import { Router } from "express";
import authRouter from "./auth.js";
import ledgerRouter from "./ledger.js";
import jwt from "jsonwebtoken";
const router = Router();

// Middleware to verify the jwt token
router.use((req, res, next) => {
  if (req.url === "/auth/login" || req.url === "/auth/register") {
    next();
    return;
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401);
    res.send({ message: "Unauthorized request" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401);
    res.send({ message: "No Token found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Unauthorized token" });
  }
});
router.use((req, res, next) => {
  const originalSend = res.send;
  res.send = (data) => {
    const formattedResponse = {
      status: res.statusCode,
      success: res.statusCode >= 200 && res.statusCode < 300,
      data: data,
      route: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    };
    res.status(200);
    res.set("Content-Type", "application/json");
    originalSend.call(res, JSON.stringify(formattedResponse));
  };

  next();
});

router.use("/auth", authRouter);
router.use("/ledger", ledgerRouter);

export default router;
