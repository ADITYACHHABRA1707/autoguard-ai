import fs from "fs";
import { spawnSync } from "child_process";

export function runRLTraining() {
  console.log("🧠 Running Oumi RL training...");

  const result = spawnSync("python3", ["oumi/trainer.py"], {
    stdio: "inherit"
  });

  if (result.error) {
    console.error("❌ RL training failed");
  } else {
    console.log("✅ RL model updated");
  }
}

export function getPolicyBias() {
  if (!fs.existsSync("oumi/policy.json")) {
    return 0;
  }

  const policy = JSON.parse(fs.readFileSync("oumi/policy.json"));
  return policy.bias || 0;
}
