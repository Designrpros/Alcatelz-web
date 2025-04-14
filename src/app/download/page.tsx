"use client";

import styled from "styled-components";
import Link from "next/link";
import { MdPhoneIphone, MdStar, MdSpeed, MdGroup, MdLock } from "react-icons/md";

const DownloadContainer = styled.div`
  background: #ffffff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HeroContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #9d845d;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #7a6644;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const ComingSoonNote = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #9d845d;
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 80rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FeatureCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #9d845d;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #4b5563;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ScreenshotsSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const ScreenshotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 80rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ScreenshotCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const ScreenshotPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ScreenshotCaption = styled.p`
  font-size: 1rem;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FooterSection = styled.section`
  padding: 3rem 2rem;
  background: #1f2937;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FooterTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FooterSubtitle = styled.p`
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function DownloadPage() {
  return (
    <DownloadContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Alcatelz</HeroTitle>
          <HeroSubtitle>
            Unleash your creativity and connect with a vibrant community. Download the Alcatelz app to get started!
          </HeroSubtitle>
          <CTAButton href="https://apps.apple.com/no/app/mapr/id6450910273">
            Download on the App Store
          </CTAButton>
          <ComingSoonNote>Coming soon - Stay tuned for the official release!</ComingSoonNote>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose Alcatelz?</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon><MdStar /></FeatureIcon>
            <FeatureTitle>Intuitive Design</FeatureTitle>
            <FeatureDescription>
              Craft stunning interfaces with ease using our user-friendly tools.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><MdSpeed /></FeatureIcon>
            <FeatureTitle>Fast Performance</FeatureTitle>
            <FeatureDescription>
              Experience seamless navigation and quick load times.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><MdGroup /></FeatureIcon>
            <FeatureTitle>Community Driven</FeatureTitle>
            <FeatureDescription>
              Share and discover resources with creators worldwide.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><MdLock /></FeatureIcon>
            <FeatureTitle>Secure & Reliable</FeatureTitle>
            <FeatureDescription>
              Your data is protected with top-notch security.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <ScreenshotsSection>
        <SectionTitle>Explore the App</SectionTitle>
        <ScreenshotGrid>
          <ScreenshotCard>
            <ScreenshotPlaceholder>App Home Screen</ScreenshotPlaceholder>
            <ScreenshotCaption>Navigate your creative hub effortlessly.</ScreenshotCaption>
          </ScreenshotCard>
          <ScreenshotCard>
            <ScreenshotPlaceholder>Resource Library</ScreenshotPlaceholder>
            <ScreenshotCaption>Access a wealth of community resources.</ScreenshotCaption>
          </ScreenshotCard>
          <ScreenshotCard>
            <ScreenshotPlaceholder>Creation Tools</ScreenshotPlaceholder>
            <ScreenshotCaption>Build with powerful design tools.</ScreenshotCaption>
          </ScreenshotCard>
        </ScreenshotGrid>
      </ScreenshotsSection>

      <FooterSection>
        <FooterTitle>Ready to Create?</FooterTitle>
        <FooterSubtitle>
          Join thousands of creators and start building with Alcatelz today.
        </FooterSubtitle>
        <CTAButton href="https://apps.apple.com/no/app/mapr/id6450910273">
          Get the App Now
        </CTAButton>
        <ComingSoonNote>Coming soon - Stay tuned for the official release!</ComingSoonNote>
      </FooterSection>
    </DownloadContainer>
  );
}