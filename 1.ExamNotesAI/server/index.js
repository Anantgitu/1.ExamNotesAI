import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/genrate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cookieParser());

/* ---------------- Stripe Webhook ---------------- */

/* ---------------- Test Route ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "ExamNotes AI Backend Running 🚀" });
});

/* ---------------- Routes ---------------- */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

/* ---------------- Start Server ---------------- */
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  await connectDb();
});