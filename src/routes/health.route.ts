import { Router } from "express";
import { AppDataSource } from "../repositories/db";

const router = Router();

router.get("/health", async (req, res) => {
  const isConnected = AppDataSource.isInitialized;
  if (isConnected) {
    console.log("Database is connected");
    return res.status(200).json({ status: "ok" });
  } else {
    console.error("Database is not connected");
    return res.status(500).json({ status: "database not connected" });
  }
});

export default router;
