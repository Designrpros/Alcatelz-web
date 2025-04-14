"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import styled, { createGlobalStyle } from "styled-components";
import { MdClose, MdMenu } from "react-icons/md";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Nav = styled.nav<{ $isDark: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  background-color: ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#ffffff')};
  height: 64px;
  border-bottom: 1px solid ${({ $isDark }) => ($isDark ? '#333333' : '#e5e7eb')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

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
  justify-content: space-between;
  height: 100%;
`;

const LogoLink = styled(Link)<{ $isDark: boolean }>`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean; $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;

  @media (max-width: 639px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#ffffff')};
    padding: 1rem 0 1rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    align-items: flex-start;
    height: auto;
  }

  @media (max-width: 768px) {
    top: 56px;
  }
  @media (max-width: 480px) {
    top: 48px;
  }
`;

const NavLink = styled(Link)<{ $active: boolean; $isDark: boolean }>`
  color: ${({ $active, $isDark }) => ($active ? ($isDark ? '#ffffff' : '#000000') : $isDark ? '#cccccc' : '#4b5563')};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#9d845d')};
  }

  @media (max-width: 639px) {
    padding: 0.5rem 0;
    width: 100%;
    text-align: left;
  }
`;

const BurgerButton = styled.button<{ $isDark: boolean }>`
  display: none;
  align-items: center;
  justify-content: center;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#4b5563')};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#9d845d')};
  }

  @media (max-width: 639px) {
    display: flex;
  }
`;

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <GlobalStyle />
      <Nav $isDark={isDark}>
        <NavContainer>
          <NavContent>
            <LogoLink href="/" $isDark={isDark}>Alcatelz</LogoLink>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <BurgerButton $isDark={isDark} onClick={toggleMenu}>
                {isMenuOpen ? <MdClose /> : <MdMenu />}
              </BurgerButton>
              <NavLinks $isOpen={isMenuOpen} $isDark={isDark}>
                <NavLink href="/blueprint" $active={pathname === '/blueprint'} $isDark={isDark}>
                  BluePrint
                </NavLink>
                <NavLink href="/community" $active={pathname === '/community'} $isDark={isDark}>
                  Community
                </NavLink>
                <NavLink href="/contribute" $active={pathname === '/contribute'} $isDark={isDark}>
                  Contribute
                </NavLink>
                <NavLink href="/download" $active={pathname === '/download'} $isDark={isDark}>
                  Download
                </NavLink>
              </NavLinks>
            </div>
          </NavContent>
        </NavContainer>
      </Nav>
    </>
  );
}