"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "./Sidebar";
import CopyButton from "@/components/CopyButton";

const PromptsContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  margin-left: 270px; /* Sidebar width (250px) + offset (1rem = 16px) */
  padding: 2rem;
  position: relative;
  transition: margin-left 0.3s ease-in-out;
  width: calc(100vw - 270px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: ${(props) => (props.isSidebarOpen ? "216px" : "0")}; /* Sidebar 200px + offset 16px */
    padding: 1rem;
    width: ${(props) => (props.isSidebarOpen ? "calc(100vw - 216px)" : "100vw")};
  }

  @media (max-width: 640px) {
    margin-left: 0;
    padding: 1rem;
    width: 100vw;
  }
`;

const BlueprintGrid = styled.div`
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  background-size: 20px 20px;
  opacity: 0.08;
  pointer-events: none;
  background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
`;

const ContentWrapper = styled.div`
  max-width: 80rem;
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const PromptDescription = styled.p`
  margin-bottom: 1rem;
  color: #4b5563;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  z-index: 0;
  width: 100%;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-repeat: repeat;
    background-size: 20px 20px;
    opacity: 0.08;
    pointer-events: none;
    background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    z-index: 0;
  }
`;

const CodeBlockContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-x: auto;
`;

const CodeBlockContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`;

export default function PromptsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const PROMPT_EXAMPLES = [
    {
      title: "Explain a Component",
      description: "Ask the LLM to explain how a specific Blueprint component works.",
      prompt: "Can you explain how the Blueprint Navbar component is structured and how to use it in a Next.js project?",
    },
    {
      title: "Troubleshoot Setup",
      description: "Get help troubleshooting issues with setting up the Blueprint library.",
      prompt: "I'm getting an error when installing styled-components with Blueprint in my React app. How can I fix this?",
    },
    {
      title: "Customize a Component",
      description: "Learn how to customize a Blueprint component’s appearance.",
      prompt: "How can I change the background color of the Blueprint Button component to blue?",
    },
    {
      title: "Best Practices",
      description: "Ask for best practices when using Blueprint components.",
      prompt: "What are the best practices for organizing Blueprint components in a large-scale Next.js application?",
    },
    {
      title: "Full Example",
      description: "Request a complete example of using a Blueprint component.",
      prompt: "Can you provide a full example of a login form using Blueprint’s Input and Button components?",
    },
    {
      title: "Debug an Issue",
      description: "Get assistance debugging a specific issue with a Blueprint component.",
      prompt: "My Blueprint Sidebar component isn’t sliding in correctly on mobile. What could be causing this?",
    },
  ];

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
      observer.current?.disconnect();
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <PromptsContainer>
      <Sidebar activeSection={activeSection} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <BlueprintGrid />
        <ContentWrapper>
          <Section id="prompts-introduction">
            <SectionTitle>Prompts Library</SectionTitle>
            <p>
              Welcome to the Prompts Library! This page provides a collection of prompt templates to help you interact with a language model (LLM) about the Blueprint Component Library. Use these prompts to learn about components, troubleshoot issues, customize components, and more. Each prompt can be copied and used in your LLM conversations.
            </p>
          </Section>

          {PROMPT_EXAMPLES.map((example, index) => (
            <Section key={index} id={`prompt-${index}`}>
              <SectionTitle>{example.title}</SectionTitle>
              <PromptDescription>{example.description}</PromptDescription>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code={example.prompt} />
                  <SyntaxHighlighter
                    language="plaintext"
                    style={vscDarkPlus}
                    customStyle={{
                      marginTop: "1rem",
                      borderRadius: "4px",
                      padding: "1rem",
                      backgroundColor: "#1f2937",
                      position: "relative",
                      zIndex: 1,
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    {example.prompt}
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
            </Section>
          ))}
        </ContentWrapper>
      </MainContent>
    </PromptsContainer>
  );
}