import fs from "fs";
import { executeAction } from "./executor.js";
import { getPolicyBias, runRLTraining } from "./rlAgent.js";

// -------- Review Agent --------
export function reviewPR(pr) {
  if (typeof pr !== 'object' || pr === null) {
    console.error("Invalid PR object provided to reviewPR");
    return { filesChanged: 0, linesChanged: 0, touchesAuth: false };
  }

  const filesChanged = typeof pr.filesChanged === 'number' ? pr.filesChanged : 0;
  const linesChanged = typeof pr.linesChanged === 'number' ? pr.linesChanged : 0;

  const touchesAuth = Array.isArray(pr.modules) && pr.modules.includes("auth") ? true : false;

  return {
    filesChanged,
    linesChanged,
    touchesAuth
  };
}

// -------- Risk Agent --------
export function calculateRisk(signals) {
  let risk = 0;

  if (signals.linesChanged > 300) risk += 0.4;
  if (signals.filesChanged > 5) risk += 0.3;
  if (signals.touchesAuth) risk += 0.4;

  return Math.min(risk, 1);
}

// -------- Decision Agent --------
export function decideAction(risk) {
  const bias = getPolicyBias();
  const adjustedRisk = Math.min(Math.max(risk + bias, 0), 1);

  if (adjustedRisk < 0.3) {
    return { action: "APPROVE", reason: "Low risk after learning adjustment" };
  }
  if (adjustedRisk < 0.7) {
    return { action: "AUTO_PATCH", reason: "Moderate risk after learning adjustment" };
  }
  return {
    action: "ROLLBACK",
    reason: "High risk after learning adjustment"
  };
}

export function actOnDecision(pr, signals, risk, decisionObj) {
  const executionResult = executeAction(decisionObj.action, pr);

  storeDecision({
    prTitle: pr.title,
    signals,
    risk,
    decision: decisionObj.action,
    explanation: decisionObj.reason,
    execution: executionResult,
    timestamp: new Date().toISOString()
  });

  runRLTraining();

  return executionResult;
}

// -------- Memory Agent --------
export function storeDecision(record) {
  try {
    const data = JSON.parse(fs.readFileSync("memory.json", "utf-8"));
    data.history.push(record);
    fs.writeFileSync("memory.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error reading or writing memory.json:", error);
    // Retry the operation once after a short delay
    setTimeout(() => {
      try {
        const data = JSON.parse(fs.readFileSync("memory.json", "utf-8"));
        data.history.push(record);
        fs.writeFileSync("memory.json", JSON.stringify(data, null, 2));
      } catch (retryError) {
        console.error("Error reading or writing memory.json (retry failed):", retryError);
      }
    }, 500);
  }
}
// TODO: Implement proper security measures for memory.json (e.g., access controls, encryption)
