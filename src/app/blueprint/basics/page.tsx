"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "./Sidebar";
import CopyButton from "@/components/CopyButton";

const BasicsContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  margin-left: 270px;
  padding: 2rem;
  position: relative;
  transition: margin-left 0.3s ease-in-out;
  width: calc(100vw - 270px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: ${(props) => (props.isSidebarOpen ? "216px" : "0")};
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

const Description = styled.p`
  margin-bottom: 1rem;
  color: #4b5563;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const ResourceLink = styled.a`
  color: #9d845d;
  text-decoration: none;
  transition: text-decoration 0.3s ease, color 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #7a6644;
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

export default function BasicsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

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
    <BasicsContainer>
      <Sidebar activeSection={activeSection} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <BlueprintGrid />
        <ContentWrapper>
          <Section id="introduction">
            <SectionTitle>Introduction</SectionTitle>
            <Description>
              The Blueprint Component Library is a collection of reusable UI components designed to help you build modern, responsive web applications with a consistent aesthetic. Built with styled-components, Blueprint emphasizes sharp borders and subtle line patterns, making it ideal for projects requiring a clean, professional look.
            </Description>
          </Section>

          <Section id="getting-started">
            <SectionTitle>Getting Started</SectionTitle>
            <Description>
              To start using Blueprint, you need to set up your project with styled-components and include the library’s components.
            </Description>
            <h3 className="text-lg font-semibold text-black mb-2">Install Styled-Components</h3>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install styled-components" />
                <SyntaxHighlighter
                  language="bash"
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
                  npm install styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <Description>
              After installing styled-components, you can import Blueprint components into your project. Copy the desired components from the `src/templates/components/` directory or use a package manager if Blueprint is published.
            </Description>
          </Section>

          <Section id="core-components">
            <SectionTitle>Core Components</SectionTitle>
            <Description>
              Blueprint includes several core components to get you started. Here’s an example of using the Button component:
            </Description>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton
                  code={`
import styled from "styled-components";

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #9d845d;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644;
  }
\`;

export default function Button() {
  return <StyledButton>Click Me</StyledButton>;
}
                `}
                />
                <SyntaxHighlighter
                  language="javascript"
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
                  {`
import styled from "styled-components";

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #9d845d;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644;
  }
\`;

export default function Button() {
  return <StyledButton>Click Me</StyledButton>;
}
                `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <Description>
              Other core components include Container, Grid, and Navbar, which you can explore in the Components section.
            </Description>
          </Section>

          <Section id="resources">
            <SectionTitle>Resources</SectionTitle>
            <Description>
              To deepen your understanding of building with Blueprint, check out these resources created by our team:
            </Description>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <ResourceLink href="https://prompted-two.vercel.app">
                  Prompt Engineering
                </ResourceLink>: Learn how to craft effective AI prompts to enhance your development workflow, useful for generating component ideas or automating tasks.
              </li>
              <li>
                <ResourceLink href="https://composition-nu.vercel.app">
                  Graphic Design
                </ResourceLink>: Explore visual design inspirations to create stunning UIs that complement Blueprint’s aesthetic.
              </li>
              <li>
                <ResourceLink href="https://layer-eight.vercel.app">
                  Web Design
                </ResourceLink>: Discover modern web design techniques to build responsive, user-friendly applications with Blueprint.
              </li>
            </ul>
            <Description>
              These resources provide additional context for mastering prompt engineering, visual design, and web development, helping you leverage Blueprint to its fullest potential.
            </Description>
          </Section>
        </ContentWrapper>
      </MainContent>
    </BasicsContainer>
  );
}