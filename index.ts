import Anthropic from "@anthropic-ai/sdk";
import { input } from "@inquirer/prompts";

const client = new Anthropic();

const username = await input({ message: "What is your name?" });

console.log("\nYour name is:  " + username);
