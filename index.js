import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const messages = [
  // const not let, you never reassign, you just push.
  {
    role: "user",
    content: "My name is Fadi",
  },
];
const printText = function (response) {
  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text + "\n");
    }
  }
};

const response1 = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: messages,
});
printText(response1);

messages.push({ role: "assistant", content: response1.content });
messages.push({ role: "user", content: "What is my name?" });

const response2 = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: messages,
});
printText(response2);
messages.push({ role: "assistant", content: response2.content });

console.log(JSON.stringify(messages));
