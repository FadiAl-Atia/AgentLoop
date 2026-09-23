import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

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
  messages: [
    { role: "user", content: "Hello Claude, my name is Fadi." },
    { role: "assistant", content: "The user name is Fadi" },
    { role: "user", content: "What is my name?" },
  ],
});
printText(response_1);

/**
 Now, the output was:
 Your name is Fadi! You just told me that. 😊

 Because you provided the whole context to the agent.
 */
