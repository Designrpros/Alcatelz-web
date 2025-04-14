"use client"

import { useState } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Styled Components for the Page Layout

const ProjectComponentContainer = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const Header = styled.header`
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
  @media (min-width: 640px) {
    font-size: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  max-width: 48rem;
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const ProjectComponentSection = styled.section`
  position: relative;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }

  /* Diagonal line pattern on the edges */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    background-repeat: repeat;
    background-size: 20px 20px;
    opacity: 0.08;
    pointer-events: none;
    background-image: linear-gradient(
        135deg,
        #e5e7eb 1px,
        transparent 1px,
        transparent 50%,
        #e5e7eb 50%,
        #e5e7eb 51%,
        transparent 51%,
        transparent
      ),
      linear-gradient(
        45deg,
        #e5e7eb 1px,
        transparent 1px,
        transparent 50%,
        #e5e7eb 50%,
        #e5e7eb 51%,
        transparent 51%,
        transparent
      );
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
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

const ProjectComponentContent = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #9ca3af;
  border-radius: 0;
  padding: 1.5rem;
`;

const DropdownRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ComponentWrapper = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ComponentTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  z-index: 0;

  /* Reuse the blueprint grid for the code block background */
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
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.3s ease;
  z-index: 2; /* Ensure the button is above the code block */

  &:hover {
    background-color: #1e4db7;
  }
`;

// Dropdown Variation 1: Minimal Dropdown
const MinimalDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MinimalDropdownButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  color: #1f2937;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1d5db;
  }
`;

const MinimalDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const MinimalDropdownItem = styled.a`
  padding: 0.5rem 1rem;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// Dropdown Variation 2: Blueprint Dropdown (inspired by src/app/page.tsx)
const BlueprintDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const BlueprintDropdownButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #b0c4de; /* Grayish-blue color for blueprint look */
  font-size: 1rem;
  color: #b0c4de;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  /* Blueprint-like lines */
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #b0c4de;
    opacity: 0.6;
  }

  &::before {
    width: 1px;
    height: 50%;
    left: 10%;
    top: 25%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 20%,
      transparent 40%,
      #b0c4de 60%,
      transparent 80%
    );
  }

  &::after {
    width: 50%;
    height: 1px;
    top: 50%;
    left: 25%;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 20%,
      transparent 40%,
      #b0c4de 60%,
      transparent 80%
    );
  }
`;

const BlueprintDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9fafb;
  border: 1px solid #b0c4de;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const BlueprintDropdownItem = styled.a`
  padding: 0.5rem 1rem;
  color: #b0c4de;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

// Dropdown Variation 3: Modern Dropdown with Hover Effect
const ModernDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ModernDropdownButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  border: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1e4db7;
    transform: scale(1.05);
  }
`;

const ModernDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${ModernDropdownContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModernDropdownItem = styled.a`
  padding: 0.5rem 1rem;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// Array of dropdown variations for scalability
const dropdownVariations = [
  {
    name: "Minimal Dropdown",
    id: "minimal",
    component: (
      <MinimalDropdownContainer>
        <MinimalDropdownButton>Dropdown</MinimalDropdownButton>
        <MinimalDropdownMenu>
          <MinimalDropdownItem href="#">Option 1</MinimalDropdownItem>
          <MinimalDropdownItem href="#">Option 2</MinimalDropdownItem>
          <MinimalDropdownItem href="#">Option 3</MinimalDropdownItem>
        </MinimalDropdownMenu>
      </MinimalDropdownContainer>
    ),
    code: `
const MinimalDropdownContainer = styled.div\`
  position: relative;
  display: inline-block;
\`;

const MinimalDropdownButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  color: #1f2937;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1d5db;
  }
\`;

const MinimalDropdownMenu = styled.div\`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
\`;

const MinimalDropdownItem = styled.a\`
  padding: 0.5rem 1rem;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
\`;

<MinimalDropdownContainer>
  <MinimalDropdownButton>Dropdown</MinimalDropdownButton>
  <MinimalDropdownMenu>
    <MinimalDropdownItem href="#">Option 1</MinimalDropdownItem>
    <MinimalDropdownItem href="#">Option 2</MinimalDropdownItem>
    <MinimalDropdownItem href="#">Option 3</MinimalDropdownItem>
  </MinimalDropdownMenu>
</MinimalDropdownContainer>
    `,
  },
  {
    name: "Blueprint Dropdown",
    id: "blueprint",
    component: (
      <BlueprintDropdownContainer>
        <BlueprintDropdownButton>Dropdown</BlueprintDropdownButton>
        <BlueprintDropdownMenu>
          <BlueprintDropdownItem href="#">Option 1</BlueprintDropdownItem>
          <BlueprintDropdownItem href="#">Option 2</BlueprintDropdownItem>
          <BlueprintDropdownItem href="#">Option 3</BlueprintDropdownItem>
        </BlueprintDropdownMenu>
      </BlueprintDropdownContainer>
    ),
    code: `
const BlueprintDropdownContainer = styled.div\`
  position: relative;
  display: inline-block;
\`;

const BlueprintDropdownButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #b0c4de;
  font-size: 1rem;
  color: #b0c4de;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #b0c4de;
    opacity: 0.6;
  }

  &::before {
    width: 1px;
    height: 50%;
    left: 10%;
    top: 25%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 20%,
      transparent 40%,
      #b0c4de 60%,
      transparent 80%
    );
  }

  &::after {
    width: 50%;
    height: 1px;
    top: 50%;
    left: 25%;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 20%,
      transparent 40%,
      #b0c4de 60%,
      transparent 80%
    );
  }
\`;

const BlueprintDropdownMenu = styled.div\`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9fafb;
  border: 1px solid #b0c4de;
  z-index: 10;
  display: flex;
  flex-direction: column;
\`;

const BlueprintDropdownItem = styled.a\`
  padding: 0.5rem 1rem;
  color: #b0c4de;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5e7eb;
  }
\`;

<BlueprintDropdownContainer>
  <BlueprintDropdownButton>Dropdown</BlueprintDropdownButton>
  <BlueprintDropdownMenu>
    <BlueprintDropdownItem href="#">Option 1</BlueprintDropdownItem>
    <BlueprintDropdownItem href="#">Option 2</BlueprintDropdownItem>
    <BlueprintDropdownItem href="#">Option 3</BlueprintDropdownItem>
  </BlueprintDropdownMenu>
</BlueprintDropdownContainer>
    `,
  },
  {
    name: "Modern Dropdown",
    id: "modern",
    component: (
      <ModernDropdownContainer>
        <ModernDropdownButton>Dropdown</ModernDropdownButton>
        <ModernDropdownMenu>
          <ModernDropdownItem href="#">Option 1</ModernDropdownItem>
          <ModernDropdownItem href="#">Option 2</ModernDropdownItem>
          <ModernDropdownItem href="#">Option 3</ModernDropdownItem>
        </ModernDropdownMenu>
      </ModernDropdownContainer>
    ),
    code: `
const ModernDropdownContainer = styled.div\`
  position: relative;
  display: inline-block;
\`;

const ModernDropdownButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  border: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1e4db7;
    transform: scale(1.05);
  }
\`;

const ModernDropdownMenu = styled.div\`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  \${ModernDropdownContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
\`;

const ModernDropdownItem = styled.a\`
  padding: 0.5rem 1rem;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
\`;

<ModernDropdownContainer>
  <ModernDropdownButton>Dropdown</ModernDropdownButton>
  <ModernDropdownMenu>
    <ModernDropdownItem href="#">Option 1</ModernDropdownItem>
    <ModernDropdownItem href="#">Option 2</ModernDropdownItem>
    <ModernDropdownItem href="#">Option 3</ModernDropdownItem>
  </ModernDropdownMenu>
</ModernDropdownContainer>
    `,
  },
];

// ProjectComponentPage Component for Dropdown
export default function DropdownPage() {
  const [selectedDropdown, setSelectedDropdown] = useState<string | null>(null);

  const handleDropdownClick = (id: string) => {
    setSelectedDropdown(id);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy code: ", err);
    });
  };

  return (
    <ProjectComponentContainer>
      <Header>
        <HeaderContent>
          <Title>Dropdown Component Variations</Title>
          <Description>
            Below are different variations of the Dropdown component, displayed in a row. Click a dropdown to see its code below, with syntax highlighting and a copy button.
          </Description>
        </HeaderContent>
      </Header>

      <ProjectComponentSection>
        <BlueprintGrid />
        <ProjectComponentContent>
          {/* Dropdown Variations in a Row */}
          <DropdownRow>
            {dropdownVariations.map((variation) => (
              <div key={variation.id} onClick={() => handleDropdownClick(variation.id)}>
                <ComponentTitle>{variation.name}</ComponentTitle>
                <ComponentWrapper>
                  {variation.component}
                </ComponentWrapper>
              </div>
            ))}
          </DropdownRow>

          {/* Single Code Section */}
          <CodeBlockWrapper>
            <ComponentTitle>
              Code for {selectedDropdown
                ? dropdownVariations.find((v) => v.id === selectedDropdown)?.name || "Selected"
                : "Selected"} Dropdown
            </ComponentTitle>
            <CodeBlockContainer>
              <CopyButton onClick={() => {
                const selectedVariation = dropdownVariations.find((v) => v.id === selectedDropdown);
                if (selectedVariation) {
                  handleCopyCode(selectedVariation.code);
                }
              }}>
                Copy Code
              </CopyButton>
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
                }}
              >
                {selectedDropdown
                  ? dropdownVariations.find((v) => v.id === selectedDropdown)?.code || "Click a dropdown variation to see its code."
                  : "Click a dropdown variation to see its code."}
              </SyntaxHighlighter>
            </CodeBlockContainer>
          </CodeBlockWrapper>
        </ProjectComponentContent>
      </ProjectComponentSection>
    </ProjectComponentContainer>
  );
}