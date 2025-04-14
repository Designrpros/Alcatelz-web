"use client";

import { useState } from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import { MdClose, MdMenu } from "react-icons/md";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent body scrolling */
  }
`;

const Nav = styled.nav`
  position: sticky;
  top: 0; /* No offset, stick to top */
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #ffffff;
  height: 64px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0; /* Prevent shrinking */
  overflow: hidden; /* Ensure no scrolling */
  @media (max-width: 768px) {
    height: 56px;
  }
  @media (max-width: 480px) {
    height: 48px;
  }
`;

const NavContainer = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 100%;
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: none;
  align-items: center;
  gap: 1.5rem;
  @media (min-width: 640px) {
    display: flex;
  }
  @media (max-width: 639px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 64px; /* Below BluePrintNavbar */
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999;
    max-height: calc(100vh - 64px); /* Limit height to avoid overflow */
    overflow-y: auto; /* Allow scrolling in dropdown if needed */
    @media (max-width: 768px) {
      top: 56px;
      max-height: calc(100vh - 56px);
    }
    @media (max-width: 480px) {
      top: 48px;
      max-height: calc(100vh - 48px);
    }
  }
`;

const NavLink = styled(Link)`
  color: #4b5563;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
  &:hover {
    color: #9d845d;
  }
  @media (max-width: 639px) {
    padding: 0.5rem 0;
    width: 100%;
    text-align: left;
  }
`;

const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.2s ease;
  &:hover {
    color: #9d845d;
  }
  @media (min-width: 640px) {
    display: none;
  }
`;

export default function BluePrintNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle />
      <Nav>
        <NavContainer>
          <NavContent>
            <BurgerButton onClick={toggleMenu}>
              {isMenuOpen ? <MdClose /> : <MdMenu />}
            </BurgerButton>
            <NavLinks $isOpen={isMenuOpen}>
              <NavLink href="/blueprint/basics">Basics</NavLink>
              <NavLink href="/blueprint/commands">Commands</NavLink>
              <NavLink href="/blueprint/prompts">Prompts</NavLink>
              <NavLink href="/blueprint/tutorial">Tutorial</NavLink>
              <NavLink href="/blueprint/components">Components</NavLink>
            </NavLinks>
          </NavContent>
        </NavContainer>
      </Nav>
    </>
  );
}