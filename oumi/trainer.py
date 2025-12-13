import json
from oumi.rl import Policy, Trainer

# Load memory
with open("memory.json") as f:
    memory = json.load(f)["history"]

# Define policy
policy = Policy(input_dim=3, output_dim=3)
trainer = Trainer(policy)

# Convert memory to RL observations
for record in memory:
    state = [
        record["signals"]["linesChanged"],
        record["signals"]["filesChanged"],
        int(record["signals"]["touchesAuth"])
    ]

    action_map = {
        "APPROVE": 0,
        "AUTO_PATCH": 1,
        "ROLLBACK": 2
    }

    reward_map = {
        "APPROVE": 1 if record["risk"] < 0.3 else -1,
        "AUTO_PATCH": 0.5,
        "ROLLBACK": 0.7
    }

    trainer.observe(
        state=state,
        action=action_map[record["decision"]],
        reward=reward_map[record["decision"]]
    )

trainer.train(epochs=10)

# Simple learned bias (for demo + explainability)
policy_bias = trainer.policy.weights.mean()

with open("oumi/policy.json", "w") as f:
    json.dump({ "bias": float(policy_bias) }, f)
