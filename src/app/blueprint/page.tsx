"use client"

import styled from "styled-components";
import Navbar from "@/components/Navbar";
import ScatteredLines from "@/components/ScatteredLines";

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
  padding-top: 5rem;
  padding-bottom: 0;
  width: 100vw; /* Ensure full viewport width */
  box-sizing: border-box;
  background-color: #ffffff; /* Dark background similar to the image */

  @media (max-width: 768px) {
    padding-top: 4rem; /* Reduce padding on smaller screens */
  }

  @media (max-width: 480px) {
    padding-top: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 28rem; /* Very large font size to match the image */
  font-weight: 700; /* Bold to match the image */
  color: #9d845d;
  line-height: 0.85;
  margin: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;

  @media (max-width: 1280px) {
    font-size: 24rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 20rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    font-size: 16rem;
    padding: 0 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 10rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 320px) {
    font-size: 8rem;
    padding: 0 0.5rem;
  }
`;

const BlueText = styled.span`
  align-self: flex-start;
`;

const PrintText = styled.span`
  align-self: flex-end;
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: #333;
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
    top: 4.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    top: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    top: 3.5rem;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    top: 3rem;
  }
`;

export default function Home() {
  return (
    <>
      <HeroSection>
        <ScatteredLines />
        <Tagline>Build with Precision</Tagline>
        <Title>
          <BlueText>Blue</BlueText>
          <PrintText>Print</PrintText>
        </Title>
      </HeroSection>
    </>
  );
}