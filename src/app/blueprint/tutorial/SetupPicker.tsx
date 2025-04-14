"use client"

import { useState } from "react";
import styled from "styled-components";

// Styled Components for the Setup Picker

const PickerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PickerLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PickerSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #f9fafb;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #9d845d;
  }
`;

interface SetupPickerProps {
  onFrameworkChange: (framework: string) => void;
  onLanguageChange: (language: string) => void;
}

export default function SetupPicker({ onFrameworkChange, onLanguageChange }: SetupPickerProps) {
  const [selectedFramework, setSelectedFramework] = useState("nextjs");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleFrameworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const framework = event.target.value;
    setSelectedFramework(framework);
    onFrameworkChange(framework);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  return (
    <PickerContainer>
      <PickerLabel>
        Framework:
        <PickerSelect value={selectedFramework} onChange={handleFrameworkChange}>
          <option value="nextjs">Next.js</option>
          <option value="vite">Vite (React)</option>
          <option value="vue">Vue</option>
          <option value="cra">Create React App</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
        </PickerSelect>
      </PickerLabel>
      <PickerLabel>
        Language:
        <PickerSelect value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript/JSX</option>
          <option value="typescript">TypeScript/TSX</option>
        </PickerSelect>
      </PickerLabel>
    </PickerContainer>
  );
}