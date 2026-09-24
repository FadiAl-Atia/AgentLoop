import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 4096;

const calculate = function ({ a, b, operation }) {
  switch (operation) {
    case "add": {
      return a + b;
    }
    case "subtract": {
      return a - b;
    }
    case "multiply": {
      return a * b;
    }
    case "divide": {
      return a / b;
    }
    default:
      console.log("Please enter a correct operation");
      break;
  }
};

const calcTool = {
  name: "calculate",
  description: "This function will be used to perform operation on two numbers",
  input_schema: {
    type: "object",
    properties: {
      a: { type: "number" },
      b: { type: "number" },
      operation: {
        type: "string",
        enum: ["add", "subtract", "multiply", "divide"],
        description: "The mathematical operation to perform",
      },
    },
    required: ["a", "b", "operation"],
  },
};

const response = await client.messages.create({
  model: MODEL,
  max_tokens: MAX_TOKENS,
  messages: [
    {
      role: "user",
      content: "What is 1234 multiplied by 4500?",
    },
  ],
  tools: [calcTool],
  system:
    "Always use the tool when asked for multiplication, don't do without it.",
});

console.log(JSON.stringify(response, null, 2));
