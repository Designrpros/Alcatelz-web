"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useCloudKitData } from "@/lib/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdArrowBack, MdDescription } from "react-icons/md";

const CategoryContainer = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#1a1a1a" : "#ffffff")};
  min-height: 100vh;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const InnerContent = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const HeaderSection = styled.section`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const BackButton = styled.button<{ $isDark: boolean }>`
  background: none;
  border: none;
  color: ${({ $isDark }) => ($isDark ? "#e5e7eb" : "#4b5563")};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #9d845d;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? "#ffffff" : "#1f2937")};
  margin-bottom: 0.5rem;

  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p<{ $isDark: boolean }>`
  font-size: 1.25rem;
  color: ${({ $isDark }) => ($isDark ? "#d1d5db" : "#4b5563")};
  margin-bottom: 1.5rem;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SearchInput = styled.input<{ $isDark: boolean }>`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#444444" : "#d1d5db")};
  border-radius: 8px;
  background: ${({ $isDark }) => ($isDark ? "#2d2d2d" : "#f9fafb")};
  color: ${({ $isDark }) => ($isDark ? "#ffffff" : "#1f2937")};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  &:focus {
    outline: none;
    border-color: #9d845d;
    box-shadow: 0 0 0 3px rgba(157, 132, 93, 0.2);
  }

  &::placeholder {
    color: ${({ $isDark }) => ($isDark ? "#6b7280" : "#9ca3af")};
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.6rem 0.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
`;

const ResourceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceItem = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#2d2d2d" : "#ffffff")};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ $isDark }) => ($isDark ? "#444444" : "#e5e7eb")};
  height: 240px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: ${({ $isDark }) => ($isDark ? "#3a3a3a" : "#f9fafb")};
  }

  @media (max-width: 1024px) {
    padding: 1.25rem;
    height: 220px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    height: 200px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    height: 180px;
  }
`;

const ResourceIcon = styled.div<{ $isDark: boolean }>`
  font-size: 2.5rem;
  color: #9d845d;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  ${ResourceItem}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
`;

const ResourceInfo = styled.div`
  flex: 1;
`;

const ResourceTitle = styled.h3<{ $isDark: boolean }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? "#ffffff" : "#1f2937")};
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${ResourceItem}:hover & {
    color: #9d845d;
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ResourceAuthor = styled.p<{ $isDark: boolean }>`
  font-size: 0.9rem;
  color: ${({ $isDark }) => ($isDark ? "#d1d5db" : "#6b7280")};
  margin: 0.25rem 0 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ResourceSummary = styled.p<{ $isDark: boolean }>`
  font-size: 0.9rem;
  color: ${({ $isDark }) => ($isDark ? "#9ca3af" : "#6b7280")};
  margin: 0.5rem 0 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const EmptyState = styled.div<{ $isDark: boolean }>`
  text-align: center;
  padding: 2rem;
  background: ${({ $isDark }) => ($isDark ? "#2d2d2d" : "#f3f4f6")};
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#444444" : "#e5e7eb")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const EmptyIcon = styled.span`
  font-size: 3rem;
  color: #9d845d;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const EmptyTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? "#e5e7eb" : "#1f2937")};
  margin: 0.75rem 0 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const EmptyMessage = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? "#d1d5db" : "#4b5563")};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const categoryDescriptions: { [key: string]: string } = {
  General: "A collection of miscellaneous resources for all interests.",
  Tutorials: "Step-by-step guides and how-tos for learning new skills.",
  Design: "Inspiration and tools for creative design projects.",
  Coding: "Resources for programmers and developers.",
  Productivity: "Tips and tools to boost your efficiency.",
  Business: "Strategies and insights for entrepreneurs and professionals.",
  Education: "Materials for teaching and learning.",
  Technology: "Latest trends and tools in tech.",
  Science: "Discoveries and studies in the scientific world.",
  Health: "Guides for wellness and healthy living.",
  Lifestyle: "Ideas for enhancing your daily life.",
  Art: "Resources for artists and art enthusiasts.",
  Music: "Everything from theory to production for musicians.",
  Photography: "Tips and techniques for photographers.",
  Writing: "Tools and inspiration for writers.",
  Research: "Methods and findings for researchers.",
  Development: "Resources for software and app development.",
  Marketing: "Strategies to promote and grow your brand.",
  Management: "Leadership and organizational skills.",
  Other: "Unique resources that don’t fit elsewhere.",
};

export default function CategoryDetailPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const { name } = params;
  const { records, loading, error } = useCloudKitData("CD_ResourceEntity");
  const [searchText, setSearchText] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("Category records loaded:", records.length);
      console.log("Filtering for category:", name);
      console.log("Available categories:", Array.from(new Set(records.map((r) => r.fields.categoryName?.value).filter(Boolean))));
    }
  }, [loading, records, name]);

  const filteredResources = searchText
    ? records.filter(
        (r) =>
          (r.fields.categoryName?.value || "").toLowerCase() === name.toLowerCase() &&
          (r.fields.title?.value || "").toLowerCase().includes(searchText.toLowerCase())
      )
    : records.filter(
        (r) => (r.fields.categoryName?.value || "").toLowerCase() === name.toLowerCase()
      );

  if (loading) {
    return (
      <CategoryContainer $isDark={isDark}>
        <InnerContent>
          <StatusMessage $isDark={isDark}>Loading...</StatusMessage>
        </InnerContent>
      </CategoryContainer>
    );
  }

  if (error) {
    return (
      <CategoryContainer $isDark={isDark}>
        <InnerContent>
          <StatusMessage $isDark={isDark}>Error loading resources: {error}</StatusMessage>
        </InnerContent>
      </CategoryContainer>
    );
  }

  return (
    <CategoryContainer $isDark={isDark}>
      <InnerContent>
        <HeaderSection>
          <BackButton $isDark={isDark} onClick={() => router.back()}>
            <MdArrowBack /> Back
          </BackButton>
          <Title $isDark={isDark}>{name}</Title>
          <Description $isDark={isDark}>
            {categoryDescriptions[name] || `Resources for ${name.toLowerCase()}.`}
          </Description>
          <SearchInput
            $isDark={isDark}
            type="text"
            placeholder={`Search in ${name}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </HeaderSection>
        <ResourceList>
          {filteredResources.length === 0 ? (
            <EmptyState $isDark={isDark}>
              <EmptyIcon>⚠️</EmptyIcon>
              <EmptyTitle $isDark={isDark}>No Resources Found</EmptyTitle>
              <EmptyMessage $isDark={isDark}>
                {searchText
                  ? `No resources match your search in the ${name} category.`
                  : `There are no resources available in the ${name} category yet. Check back later or contribute your own!`}
              </EmptyMessage>
            </EmptyState>
          ) : (
            filteredResources.map((resource) => (
              <StyledLink key={resource.recordName} href={`/resource/${resource.recordName}`}>
                <ResourceItem $isDark={isDark}>
                  <ResourceIcon $isDark={isDark}>
                    <MdDescription />
                  </ResourceIcon>
                  <ResourceInfo>
                    <ResourceTitle $isDark={isDark}>{resource.fields.title?.value || "Untitled"}</ResourceTitle>
                    <ResourceAuthor $isDark={isDark}>
                      Author: {resource.fields.author?.value || "Unknown"}
                    </ResourceAuthor>
                    <ResourceSummary $isDark={isDark}>
                      {resource.fields.summary?.value || "No summary available"}
                    </ResourceSummary>
                  </ResourceInfo>
                </ResourceItem>
              </StyledLink>
            ))
          )}
        </ResourceList>
      </InnerContent>
    </CategoryContainer>
  );
}

const StatusMessage = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? "#e5e7eb" : "#4b5563")};
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ $isDark }) => ($isDark ? "#2d2d2d" : "#f3f4f6")};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
`;