import express from 'express';

const app = express();
app.use(express.json());

// ==========================================
// 🧠 BACKEND LOGIC (Stable + Lite)
// ==========================================

const reviewPR = (pr = {}) => ({
    files: pr.filesChanged || 0,
    lines: pr.linesChanged || 0,
    auth: Array.isArray(pr.modules) && pr.modules.includes('auth')
});

const calculateRisk = (signals) => {
    let risk = 0;

    if (signals.auth) risk += 0.5;          // Critical module
    if (signals.files > 3) risk += 0.25;    // Medium PR
    if (signals.lines > 150) risk += 0.25;  // Large diff

    return Math.min(risk, 1);
};

const decideAction = (risk) => {
    if (risk >= 0.8)
        return { action: "ROLLBACK", color: "red", reason: "Critical Risk Detected" };

    if (risk >= 0.4)
        return { action: "AUTO_PATCH", color: "yellow", reason: "Moderate Risk - Needs Fix" };

    return { action: "APPROVE", color: "green", reason: "Safe Change" };
};

// ==========================================
// 🌐 API ENDPOINTS
// ==========================================

app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        node: process.version,
        uptime: process.uptime()
    });
});

app.post('/pr', (req, res) => {
    try {
        const pr = req.body || {};
        const signals = reviewPR(pr);
        const risk = calculateRisk(signals);
        const decision = decideAction(risk);

        res.json({
            title: pr.title || "Untitled PR",
            analysis: { signals, risk },
            decision
        });
    } catch {
        res.status(500).json({ error: "Analysis Failed" });
    }
});

// ==========================================
// 🎨 FRONTEND UI (UNCHANGED STYLE)
// ==========================================

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>AutoGuard AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white p-10">

<h1 class="text-3xl font-bold mb-4">🛡️ AutoGuard AI</h1>
<p class="text-gray-400 mb-6">Autonomous Pull Request Risk Analyzer</p>

<button onclick="run()" class="px-6 py-3 bg-emerald-600 rounded">
    Simulate PR
</button>

<pre id="out" class="mt-6 bg-black p-4 rounded text-sm"></pre>

<script>
async function run() {
    const res = await fetch('/pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'feat: update auth logic',
            filesChanged: 5,
            linesChanged: 220,
            modules: ['auth']
        })
    });

    const data = await res.json();
    document.getElementById('out').textContent =
        JSON.stringify(data, null, 2);
}
</script>

</body>
</html>
`);
});

export default app;
