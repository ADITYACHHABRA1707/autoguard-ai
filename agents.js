import fs from "fs";

// -------- Review Agent --------
export function reviewPR(pr) {
  return {
    filesChanged: pr.filesChanged || 0,
    linesChanged: pr.linesChanged || 0,
    touchesAuth: pr.modules?.includes("auth") || false
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
  if (risk < 0.3) {
    return { action: "APPROVE", reason: "Low risk change" };
  }
  if (risk < 0.7) {
    return { action: "AUTO_PATCH", reason: "Moderate risk — auto-fix needed" };
  }
  return {
    action: "ROLLBACK",
    reason: "High risk change touching critical systems"
  };
}

// -------- Memory Agent --------
export function storeDecision(record) {
  const data = JSON.parse(fs.readFileSync("memory.json", "utf-8"));
  data.history.push(record);
  fs.writeFileSync("memory.json", JSON.stringify(data, null, 2));
}
