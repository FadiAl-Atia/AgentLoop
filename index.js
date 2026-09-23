import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: [{ role: "user", content: "Hello Claude, can you hear me?" }],
});

for (const block of response.content) {
  if (block.type === "text") {
    console.log(res.text + "\n");
  }
}
