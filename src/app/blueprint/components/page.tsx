"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "./Sidebar";
import CopyButton from "@/components/CopyButton";

const ComponentsContainer = styled.div`
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

const ComponentList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
`;

const ComponentItem = styled.li`
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.5;
  margin-bottom: 0.5rem;

  a {
    color: #9d845d;
    text-decoration: none;
    transition: text-decoration 0.3s ease, color 0.3s ease;
    &:hover {
      text-decoration: underline;
      color: #7a6644;
    }
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

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const libraryComponents = [
    {
      category: "Layout",
      components: [
        { name: "Container", description: "A responsive container component." },
        { name: "Grid", description: "A flexible grid layout system." },
        { name: "Stack", description: "A component for vertical or horizontal stacking." },
      ],
    },
    {
      category: "Navigation",
      components: [
        { name: "Navbar", description: "A customizable navigation bar." },
        { name: "Sidebar", description: "A vertical navigation sidebar." },
        { name: "Tabs", description: "A tabbed navigation component." },
        { name: "Breadcrumbs", description: "A breadcrumb navigation trail." },
      ],
    },
    {
      category: "Forms",
      components: [
        { name: "Button", description: "A styled button component." },
        { name: "Input", description: "A customizable input field." },
        { name: "Select", description: "A dropdown select menu." },
        { name: "Checkbox", description: "A checkbox input component." },
        { name: "Radio", description: "A radio button component." },
      ],
    },
    {
      category: "Feedback",
      components: [
        { name: "Alert", description: "A component for displaying alerts." },
        { name: "Toast", description: "A temporary notification popup." },
        { name: "Progress", description: "A progress bar indicator." },
      ],
    },
    {
      category: "Data Display",
      components: [
        { name: "Table", description: "A data table component." },
        { name: "Card", description: "A card component for content display." },
        { name: "Badge", description: "A small status indicator." },
      ],
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
    const componentItems = document.querySelectorAll("li[id]");
    sections.forEach((section) => observer.current?.observe(section));
    componentItems.forEach((item) => observer.current?.observe(item));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
      componentItems.forEach((item) => observer.current?.unobserve(item));
      observer.current?.disconnect();
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ComponentsContainer>
      <Sidebar
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <BlueprintGrid />
        <ContentWrapper>
          <Section id="introduction">
            <SectionTitle>Introduction</SectionTitle>
            <p>
              Welcome to the components documentation for the Blueprint Component Library. This library provides a collection of reusable UI components designed with a blueprint aesthetic, featuring sharp borders and subtle line patterns. Each component is highly customizable and can be tailored to fit your project’s needs.
            </p>
          </Section>

          {libraryComponents.map((category, index) => (
            <Section key={index} id={category.category.toLowerCase().replace(/\s/g, "-")}>
              <SectionTitle>{category.category}</SectionTitle>
              <ComponentList>
                {category.components.map((component, compIndex) => (
                  <ComponentItem
                    key={compIndex}
                    id={component.name.toLowerCase().replace(/\s/g, "-")}
                  >
                    <a href={`/src/templates/components/${component.name.toLowerCase().replace(/\s/g, "-")}`}>
                      {component.name}
                    </a>: {component.description}
                  </ComponentItem>
                ))}
              </ComponentList>
            </Section>
          ))}

          <Section id="getting-started">
            <SectionTitle>Getting Started</SectionTitle>
            <p>
              To use a component in your project, you can copy its code from the component’s template page and customize it as needed. Here’s an example of how to use a button component:
            </p>
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
          </Section>
        </ContentWrapper>
      </MainContent>
    </ComponentsContainer>
  );
}