import Anthropic from "@anthropic-ai/sdk";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

//Client
const client = new Anthropic();
const rl = readline.createInterface({ input, output });

//Config
const messages: Anthropic.MessageParam[] = [];

const modelConfig = {
  model: "claude-haiku-4-5",
  max_tokens: 4096,
  messages: messages,
};

//Print text of the agent.
const printText = function (response: any) {
  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text + "\n");
    }
  }
};

/*Messages array that will be used for context, each new message either from user or agent will be pushed here.
It will follow strict object structure (role, content) required by Claude.
*/

//Welcoming message.
console.log(
  "Welcome to your conversation with Claude, type (exit) to quit. \n",
);
//Agent Loop
while (true) {
  //Ask user for input to start the conversation.
  const userResponse = await rl.question("You: ");
  //Check if the user wants to exit the chat
  if (userResponse == "exit") {
    break;
  }
  //Push user message to messages array to keep aware of context.
  messages.push({
    role: "user",
    content: userResponse,
  });

  //Agent response.
  const newResponse: Anthropic.Message =
    await client.messages.create(modelConfig);

  printText(newResponse);
  //Push the agent response aswell to keep aware of context.
  messages.push({
    role: newResponse.role,
    content: newResponse.content,
  });
}

console.log("\n\n\n Ended.");
rl.close();
