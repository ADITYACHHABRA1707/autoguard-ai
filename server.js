import express from "express";
import {
  reviewPR,
  calculateRisk,
  decideAction,
  storeDecision
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

  storeDecision({
    prTitle: pr.title,
    signals,
    risk,
    decision: decision.action,
    explanation: decision.reason,
    timestamp: new Date().toISOString()
  });

  console.log("🤖 Decision:", decision.action);

  res.json({
    decision: decision.action,
    explanation: decision.reason,
    risk
  });
});

app.listen(3000, () => {
  console.log("🚀 AutoGuard AI running on http://localhost:3000");
});
