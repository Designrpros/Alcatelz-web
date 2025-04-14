'use client';

import styled from 'styled-components';
import BluePrintNavbar from './BluePrintNavbar';

const BlueprintLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; /* Full viewport height */
  overflow: hidden; /* Prevent scrolling on layout */
`;

const MainContent = styled.main`
  flex: 1;
  height: calc(100vh - 64px); /* Account for BluePrintNavbar height */
  overflow: auto; /* Allow scrolling within main content */
  @media (max-width: 768px) {
    height: calc(100vh - 56px);
  }
  @media (max-width: 480px) {
    height: calc(100vh - 48px);
  }
`;

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlueprintLayoutContainer>
      <BluePrintNavbar />
      <MainContent>{children}</MainContent>
    </BlueprintLayoutContainer>
  );
}