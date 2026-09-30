import Anthropic from "@anthropic-ai/sdk";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { listFilesInDirectory } from "./tools/list-files.ts";

const client = new Anthropic();
const rl = readline.createInterface({ input, output });

const messages: Anthropic.MessageParam[] = [];

const modelConfig = {
  model: "claude-haiku-4-5",
  max_tokens: 4096,
  system:
    "You are an agent that helps list files that are in a directory, and print content of a file.",
  tools: [
    {
      name: "list_files",
      description: "Lists all files in a given directory",
      input_schema: {
        type: "object",
        properties: {
          directoryPath: {
            type: "string",
            description:
              "The absolute or relative path to the current directory that we will list its items.",
          },
        },
        required: ["directoryPath"],
      },
    },
  ] as Anthropic.Tool[],
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
    while (true) {
      const newResponse: Anthropic.Message = await client.messages.create({
        ...modelConfig,
        messages: messages,
      });
      messages.push({
        role: newResponse.role,
        content: newResponse.content,
      });
      if (newResponse.stop_reason !== "tool_use") {
        printText(newResponse);
        break;
      }
      //if stop_reason was tool_use

      for (const block of newResponse.content) {
        if (block.type == "tool_use") {
          const path = (block.input as { directoryPath: string }).directoryPath;
          const listFilesOutput = await listFilesInDirectory(path);
          messages.push({
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: block.id,
                content: listFilesOutput.join("\n"),
              },
            ],
          });
        }
      }
    }
  }
}

await harness();
console.log("\n\n\n Ended.");
rl.close();
