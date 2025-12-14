# 🛡️ AutoGuard AI  
### Autonomous PR Doctor for Modern Software Engineering

> **“AutoGuard AI doesn’t just review pull requests — it diagnoses them, decides their fate, and learns from every outcome.”**

AutoGuard AI is a **production-grade autonomous AI system** that analyzes Pull Requests, evaluates risk, makes explainable decisions, and continuously improves over time.

This project is built to demonstrate **real autonomous developer tooling**, not a demo — fully aligned with the hackathon’s judging criteria.

---

## 🚀 Live Deployment

🌐 **Deployed on Vercel (Serverless, Node.js 20+)**

Available endpoints:

- `/` → Interactive PR Doctor UI  
- `/health` → Runtime & system health  
- `/pr` → Autonomous PR analysis API  

The system is live, stable, and production-ready.

---

## 🧠 Core Concept

Most tools **assist developers**.  
AutoGuard AI **acts on their behalf**.

It behaves like an **AI doctor for Pull Requests**:

1. Observes a PR
2. Diagnoses risk using multiple signals
3. Makes an autonomous decision
4. Executes actions
5. Learns from outcomes

No human approval loops.  
No static rules engine.  
This is **agentic AI for DevOps**.

---

## 🏗️ System Architecture

┌──────────────┐
│ Pull Request │
└──────┬───────┘
↓
┌────────────────────────┐
│ CodeRabbit │
│ AI PR Review & Signals │
└──────┬─────────────────┘
↓
┌────────────────────────┐
│ AutoGuard AI Core │
│ - Risk Engine │
│ - Decision Agent │
│ - Execution Router │
└──────┬─────────────────┘
↓
┌────────────────────────┐
│ Oumi RL Engine │
│ Reinforcement Learning │
│ Biases future decisions │
└──────┬─────────────────┘
↓
┌────────────────────────┐
│ Autonomous Actions │
│ ✔ Approve PR │
│ 🛠 Auto-Patch via Cline │
│ ⛔ Rollback Decision │
└────────────────────────┘ 


---

## 🔧 Tech Stack (ONLY What We Actually Use)

### 🧠 **Cline CLI (MANDATORY)**
**Role:** Autonomous code execution & patch generation  

**How we use it:**
- Cline is invoked programmatically as an **execution engine**
- Generates patches for risky PRs
- Demonstrates **automation built on top of the CLI**, not chat usage

**Why it matters:**
> This fulfills the requirement to build **new autonomous capabilities on top of the Cline CLI**.

---

### 🧪 **Oumi (MANDATORY – Reinforcement Learning)**
**Role:** Self-learning decision brain  

**How we use it:**
- PR signals are treated as RL state
- Actions: `APPROVE`, `AUTO_PATCH`, `ROLLBACK`
- Rewards based on decision safety
- Learned bias influences future decisions

**Why it matters:**
> Decisions improve over time — not rule-based, but **learning-based autonomy**.

---

### 🐰 **CodeRabbit (MANDATORY)**
**Role:** AI-powered PR review & quality enforcement  

**How we use it:**
- Reviews PRs automatically
- Provides code quality suggestions
- Flags configuration and deployment issues
- Activity is visible in PR history

**Why it matters:**
> Demonstrates **AI-assisted open-source best practices**.

---

### 🌐 **Vercel (MANDATORY)**
**Role:** Production deployment  

**How we use it:**
- Serverless Node.js 20 runtime
- Live preview + production URLs
- Zero-infra, scalable deployment

**Why it matters:**
> Shows the system is **real, live, and usable**, not theoretical.

---

## 🎨 Production-Grade PR Doctor UI

The UI is not cosmetic — it is **diagnostic**.

### UI Capabilities:
- Simulate Pull Requests
- Visualize risk score (0–1)
- Explainable AI reasoning
- Clear decision outcomes
- Terminal-style execution logs
- Judge-friendly clarity

This allows judges to **see autonomy in action**, not just read about it.

---

## 🧪 Example Autonomous Flow

1. PR touches `auth` module  
2. Risk engine increases risk score  
3. Decision agent selects `AUTO_PATCH`  
4. Cline generates patch autonomously  
5. Outcome logged and learned by Oumi  
6. Future decisions improve  

➡️ **Closed learning loop**

---

## 🏆 Why AutoGuard AI Wins

✅ Fully autonomous  
✅ Learning-based decisions (RL)  
✅ Real CLI automation  
✅ Production deployment  
✅ Explainable AI  
✅ Clean open-source workflow  
✅ Solo-built, end-to-end  

This is **not a chatbot**.  
This is **an autonomous software engineer assistant**.

---

## 🧭 Run Locally

```bash
npm install
node api/index.js
Visit:

http://localhost:3000

http://localhost:3000/health

📌 Final Note to Judges

AutoGuard AI demonstrates what happens when:

AI agents are trusted with decisions

Learning replaces static rules

CLIs become autonomous systems

This is the future of software development.

— Built to win.
