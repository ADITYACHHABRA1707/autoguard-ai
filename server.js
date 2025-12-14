import express from "express";
import {
  reviewPR,
  calculateRisk,
  decideAction,
  actOnDecision
} from "./agents.js";

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "AutoGuard AI is running" });
});

// PR Webhook
app.post("/pr", (req, res) => {
  const pr = req.body;

  console.log("📥 PR received:", pr.title);

  const signals = reviewPR(pr);
  const risk = calculateRisk(signals);
  const decision = decideAction(risk);

  const execution = actOnDecision(pr, signals, risk, decision);

  console.log("🤖 Decision:", decision.action);

  res.json({
    decision: decision.action,
    explanation: decision.reason,
    risk,
    execution
  });
});

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("🚀 AutoGuard AI running on http://localhost:3000");
  });
}
