import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
let messages = [
  {
    role: "user",
    content: "My name is Fadi",
  },
];
const printText = async function (response) {
  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text + "\n");
    }
  }
};

const response_1 = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: messages,
});
printText(response_1);

messages.push({ role: "assistant", content: response_1.content });
messages.push({ role: "user", content: "What is my name?" });

const response_2 = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: messages,
});
printText(response_2);

console.log(JSON.stringify(messages));
/**
 Now, the output was:
 Hi Fadi! Nice to meet you. How can I help you today?

Your name is Fadi! You told me that at the start of our conversation.

[{"role":"user","content":"My name is Fadi"},{"role":"assistant","content":[{"type":"text","text":"Hi Fadi! Nice to meet you. Howcan I help you today?"}]},{"role":"user","content":"What is my name?"}]
 */
