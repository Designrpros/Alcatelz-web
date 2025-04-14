// PromptsLibrary.ts
// A collection of prompt templates for LLM conversations about the Blueprint Component Library

// Base prompt to set the context for all conversations
const BASE_PROMPT = `
You are an expert software developer with deep knowledge of the Blueprint Component Library, a React-based UI library that uses styled-components for styling. The library provides reusable components for building modern web applications. Your role is to assist users in understanding, using, and troubleshooting the library. Provide clear, concise, and accurate answers, using code examples where appropriate. If a user asks about a specific framework, language, or customization, tailor your response accordingly. Always ensure your answers are relevant to the Blueprint Component Library and its usage.
`;

// Prompt templates for different use cases
export const PROMPTS_LIBRARY = {
  EXPLAIN_COMPONENT: (componentName: string) => `
${BASE_PROMPT}
A user wants to understand how to use the ${componentName} component from the Blueprint Component Library. Explain the purpose of the ${componentName} component, its key props, and provide a simple code example showing how to use it in a React application. Ensure the example uses styled-components for styling.
`,
  TROUBLESHOOT_SETUP: (framework: string, language: string) => `
${BASE_PROMPT}
A user is having trouble setting up the Blueprint Component Library in a ${framework} project using ${language} (e.g., JavaScript/JSX or TypeScript/TSX). Provide a step-by-step guide to set up the library in a ${framework} project, including any necessary dependencies, configuration files, and potential pitfalls to avoid. If there are known issues with ${framework} and ${language}, address them and suggest solutions.
`,
  CUSTOMIZE_COMPONENT: (componentName: string, customizationGoal: string) => `
${BASE_PROMPT}
A user wants to customize the ${componentName} component from the Blueprint Component Library to achieve the following goal: ${customizationGoal}. Provide a detailed explanation of how to customize the ${componentName} component using styled-components. Include a code example showing the original component usage and the customized version that meets the user's goal.
`,
  BEST_PRACTICES: (framework: string) => `
${BASE_PROMPT}
A user wants to know the best practices for integrating the Blueprint Component Library into a ${framework} project. Provide a list of best practices, including tips for performance optimization, maintainability, and styling consistency. Include examples where relevant to illustrate your points.
`,
  FULL_EXAMPLE: (useCase: string, framework: string) => `
${BASE_PROMPT}
A user wants to see a full example of using the Blueprint Component Library in a ${framework} project for the following use case: ${useCase}. Create a complete example that includes at least two components from the Blueprint Component Library, styled with styled-components. Provide the full code, including imports, component usage, and styling, and explain how the components work together to achieve the use case.
`,
  DEBUG_ISSUE: (issueDescription: string, codeSnippet: string) => `
${BASE_PROMPT}
A user is encountering the following issue with the Blueprint Component Library: ${issueDescription}. Here is the relevant code snippet they provided:

\`\`\`jsx
${codeSnippet}
\`\`\`

Analyze the code snippet and the issue description. Identify the potential cause of the issue and provide a detailed solution, including corrected code if necessary. Explain why the issue occurred and how your solution resolves it.
`,
};

// Sample data for the prompts to display on the page
export const PROMPT_EXAMPLES = [
  {
    title: "Explain a Component",
    description: "Use this prompt to learn about a specific component in the Blueprint Component Library, including its purpose, props, and usage.",
    prompt: PROMPTS_LIBRARY.EXPLAIN_COMPONENT("Button"),
  },
  {
    title: "Troubleshoot Setup",
    description: "Use this prompt to troubleshoot setup issues for a specific framework and language.",
    prompt: PROMPTS_LIBRARY.TROUBLESHOOT_SETUP("Next.js", "TypeScript"),
  },
  {
    title: "Customize a Component",
    description: "Use this prompt to customize a component for a specific goal, such as changing its appearance or behavior.",
    prompt: PROMPTS_LIBRARY.CUSTOMIZE_COMPONENT("Button", "Change the background color to green and add a rounded border"),
  },
  {
    title: "Best Practices",
    description: "Use this prompt to get best practices for integrating the library into a specific framework.",
    prompt: PROMPTS_LIBRARY.BEST_PRACTICES("Next.js"),
  },
  {
    title: "Full Example",
    description: "Use this prompt to generate a full example with multiple components for a specific use case.",
    prompt: PROMPTS_LIBRARY.FULL_EXAMPLE("Create a simple form with a button and input", "React"),
  },
  {
    title: "Debug an Issue",
    description: "Use this prompt to debug a specific issue with the library by providing a code snippet and issue description.",
    prompt: PROMPTS_LIBRARY.DEBUG_ISSUE(
      "The Button component does not respond to clicks",
      `
import styled from "styled-components";

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #9d845d;
  color: white;
  border: none;
\`;

export default function Button() {
  return <StyledButton onClick={() => console.log("Clicked!")}>Click Me</StyledButton>;
}
      `
    ),
  },
];