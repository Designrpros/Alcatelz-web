"use client";

import styled from "styled-components";

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem;
  position: fixed;
  top: 64px; /* Below BluePrintNavbar (64px) */
  left: 1rem; /* Shift slightly to the right */
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 10;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 200px;
    transform: translateX(-100%);
    left: 0; /* Reset left offset on mobile */
    top: 56px;
    height: calc(100vh - 56px);
    &.open {
      transform: translateX(0);
    }
  }

  @media (max-width: 480px) {
    top: 48px;
    height: calc(100vh - 48px);
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const SidebarLink = styled.a<{ $isActive: boolean }>`
  display: block;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: ${(props) => (props.$isActive ? "700" : "400")};

  &:hover {
    color: #9d845d;
  }
`;

const SidebarToggle = styled.button`
  display: none;
  position: fixed;
  top: 74px; /* Below BluePrintNavbar, adjusted for padding */
  left: 1rem;
  z-index: 20;
  background-color: #9d845d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644;
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    top: 58px;
  }
`;

interface SidebarProps {
  activeSection: string | null;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ activeSection, isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      <SidebarToggle onClick={toggleSidebar}>
        {isOpen ? "Close" : "Menu"}
      </SidebarToggle>
      <SidebarContainer className={isOpen ? "open" : ""}>
        <SidebarTitle>Prompts</SidebarTitle>
        <SidebarLink href="#prompts-introduction" $isActive={activeSection === "prompts-introduction"}>
          Introduction
        </SidebarLink>
        <SidebarLink href="#prompt-0" $isActive={activeSection === "prompt-0"}>
          Explain a Component
        </SidebarLink>
        <SidebarLink href="#prompt-1" $isActive={activeSection === "prompt-1"}>
          Troubleshoot Setup
        </SidebarLink>
        <SidebarLink href="#prompt-2" $isActive={activeSection === "prompt-2"}>
          Customize a Component
        </SidebarLink>
        <SidebarLink href="#prompt-3" $isActive={activeSection === "prompt-3"}>
          Best Practices
        </SidebarLink>
        <SidebarLink href="#prompt-4" $isActive={activeSection === "prompt-4"}>
          Full Example
        </SidebarLink>
        <SidebarLink href="#prompt-5" $isActive={activeSection === "prompt-5"}>
          Debug an Issue
        </SidebarLink>
      </SidebarContainer>
    </>
  );
}