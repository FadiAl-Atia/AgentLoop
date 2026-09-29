import Anthropic from "@anthropic-ai/sdk";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const client = new Anthropic();
const rl = readline.createInterface({ input, output });

const messages: Anthropic.MessageParam[] = [];

const modelConfig = {
  model: "claude-haiku-4-5",
  max_tokens: 4096,
  system:
    "You are an agent that helps list files that are in a directory, and print content of a file.",
};

const printText = function (response: Anthropic.Message) {
  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text + "\n");
    }
  }
};

async function getUserInput(): Promise<string> {
  const userResponse = await rl.question("You: ");
  return userResponse;
}

console.log(
  "Welcome to your conversation with Claude, type (exit) to quit. \n",
);

async function harness() {
  while (true) {
    const userResponse = await getUserInput();
    if (userResponse === "exit") {
      break;
    }
    messages.push({
      role: "user",
      content: userResponse,
    });

    const newResponse: Anthropic.Message = await client.messages.create({
      ...modelConfig,
      messages: messages,
    });

    printText(newResponse);
    messages.push({
      role: newResponse.role,
      content: newResponse.content,
    });
  }
}

await harness();
console.log("\n\n\n Ended.");
rl.close();
