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
  messages: [{ role: "user", content: "Hello Claude, my name is Fadi." }],
});
printText(response_1);

const response_2 = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: [{ role: "user", content: "Hello Claude, what is my name?" }],
});
printText(response_2);

/*
 
Output was:
Hi Fadi, nice to meet you! How's your day going, and what can I help you with?

I don't have access to any information about you, including your name. Each conversation starts fresh, so unless you tell me, I have no way of knowing who you are.

If you'd like, you can share your name with me now!

Which proves that agents are stateless, they don't keep context in their memory, you always have to send the full chat.

 */
