import { execSync } from "child_process";

export function executeAction(decision, pr) {
  if (decision === "AUTO_PATCH") {
    console.log("🛠️ Invoking Cline to generate patch...");

    try {
      const sanitizedTitle = pr.title.replace(/[^a-zA-Z0-9\s]/g, "");
execSync(
        `cline -y "Generate a safe code patch for a pull request titled '${sanitizedTitle}'. Focus on reducing risk and improving safety."`,
        { stdio: "inherit" }
      );

      return "PATCH_EXECUTED";
    } catch (err) {
      console.error("❌ Cline patch failed");
      return "PATCH_FAILED";
    }
  }

  if (decision === "ROLLBACK") {
    console.log("⏪ Simulating rollback action");
    return "ROLLBACK_EXECUTED";
  }

  if (decision === "APPROVE") {
    console.log("✅ PR approved — no action required");
    return "APPROVED";
  }
}