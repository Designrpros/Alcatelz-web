"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCloudKitData } from "@/lib/hooks";
import Link from "next/link";
import {
  MdPublic, MdBook, MdBrush, MdCode, MdAccessTime, MdBusiness, MdSchool,
  MdSettings, MdScience, MdFavorite, MdSpa, MdPalette, MdMusicNote,
  MdCamera, MdCreate, MdSearch, MdBuild, MdCampaign, MdGroup, MdMoreHoriz,
  MdDescription,
} from "react-icons/md";

const CommunityContainer = styled.div<{ $isDark: boolean }>`
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

const Header = styled.h1<{ $isDark: boolean }>`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? "#ffffff" : "#1f2937")};
  letter-spacing: -0.02em;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
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
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? "#e5e7eb" : "#1f2937")};
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #9d845d;
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.35rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const TrendingList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  width: 100%;
  padding-bottom: 0.75rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryList = styled.div`
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ $isDark }) => ($isDark ? "#444444" : "#e5e7eb")};
  height: 180px;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: ${({ $isDark }) => ($isDark ? "#3a3a3a" : "#f9fafb")};
  }

  @media (max-width: 1024px) {
    padding: 0.75rem;
    height: 160px;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    height: 140px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    height: 120px;
  }
`;

const CategoryItem = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#2d2d2d" : "#ffffff")};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ $isDark }) => ($isDark ? "#444444" : "#e5e7eb")};
  height: 240px;
  justify-content: center;

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

const ItemIcon = styled.div<{ $isDark: boolean }>`
  font-size: 3.5rem;
  margin-bottom: 0.75rem;
  color: #9d845d;
  transition: transform 0.3s ease;

  ${ResourceItem}:hover &,
  ${CategoryItem}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ItemTitle = styled.h3<{ $isDark: boolean }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? "#ffffff" : "#1f2937")};
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${ResourceItem}:hover &,
  ${CategoryItem}:hover & {
    color: #9d845d;
  }

  @media (max-width: 1024px) {
    font-size: 1.15rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

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

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const categoryIcons: { [key: string]: React.ComponentType } = {
  General: MdPublic,
  Tutorials: MdBook,
  Design: MdBrush,
  Coding: MdCode,
  Productivity: MdAccessTime,
  Business: MdBusiness,
  Education: MdSchool,
  Technology: MdSettings,
  Science: MdScience,
  Health: MdFavorite,
  Lifestyle: MdSpa,
  Art: MdPalette,
  Music: MdMusicNote,
  Photography: MdCamera,
  Writing: MdCreate,
  Research: MdSearch,
  Development: MdBuild,
  Marketing: MdCampaign,
  Management: MdGroup,
  Other: MdMoreHoriz,
};

export default function CommunityPage() {
  const { records: resources, loading: resourceLoading, error: resourceError } = useCloudKitData("CD_ResourceEntity");
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
    if (!resourceLoading) {
      console.log("Resource loading complete. Records:", resources.length, "Error:", resourceError);
      if (resources.length > 0) {
        console.log(
          "Resources:",
          resources.map((r) => ({
            id: r.recordName,
            title: r.fields.title?.value,
            categoryName: r.fields.categoryName?.value,
            content: r.fields.content?.value,
          }))
        );
        console.log(
          "Categories found:",
          Array.from(new Set(resources.map((r) => r.fields.categoryName?.value).filter(Boolean)))
        );
      } else {
        console.log("No resources found. Check CloudKit Dashboard for CD_ResourceEntity records.");
      }
    }
  }, [resources, resourceLoading, resourceError]);

  const derivedCategories = Array.from(
    new Set(
      resources
        .map((record) => record.fields.categoryName?.value)
        .filter((name): name is string => !!name)
    )
  ).map((name, index) => ({
    recordName: `category-${index}`,
    fields: { name: { value: name } },
  }));

  const fallbackCategories = [
    { name: "General", recordName: "fallback-0" },
    { name: "Tutorials", recordName: "fallback-1" },
    { name: "Design", recordName: "fallback-2" },
    { name: "Coding", recordName: "fallback-3" },
    { name: "Productivity", recordName: "fallback-4" },
    { name: "Business", recordName: "fallback-5" },
    { name: "Education", recordName: "fallback-6" },
    { name: "Technology", recordName: "fallback-7" },
    { name: "Science", recordName: "fallback-8" },
    { name: "Health", recordName: "fallback-9" },
    { name: "Lifestyle", recordName: "fallback-10" },
    { name: "Art", recordName: "fallback-11" },
    { name: "Music", recordName: "fallback-12" },
    { name: "Photography", recordName: "fallback-13" },
    { name: "Writing", recordName: "fallback-14" },
    { name: "Research", recordName: "fallback-15" },
    { name: "Development", recordName: "fallback-16" },
    { name: "Marketing", recordName: "fallback-17" },
    { name: "Management", recordName: "fallback-18" },
    { name: "Other", recordName: "fallback-19" },
  ].map((cat) => ({ recordName: cat.recordName, fields: { name: { value: cat.name } } }));

  const displayCategories = derivedCategories.length > 0 ? derivedCategories : fallbackCategories;

  const filteredResources = searchText
    ? resources.filter((record) =>
        (record.fields.title?.value || "").toLowerCase().includes(searchText.toLowerCase())
      )
    : resources;

  return (
    <CommunityContainer $isDark={isDark}>
      <InnerContent>
        <HeaderSection>
          <Header $isDark={isDark}>Community</Header>
          <SearchInput
            $isDark={isDark}
            type="text"
            placeholder="Search Community"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </HeaderSection>
        {resourceLoading && <StatusMessage $isDark={isDark}>Loading resources...</StatusMessage>}
        {resourceError && (
          <StatusMessage $isDark={isDark}>
            Error loading resources: {resourceError}. Please try again or check CloudKit Dashboard.
          </StatusMessage>
        )}
        {!resourceLoading && !resourceError && resources.length === 0 && (
          <StatusMessage $isDark={isDark}>
            No community resources found. Create resources in the app or check CloudKit Dashboard for CD_ResourceEntity records.
          </StatusMessage>
        )}
        {!resourceLoading && !resourceError && resources.length > 0 && (
          <>
            <Section id="trending-resources">
              <SectionTitle $isDark={isDark}>Trending Resources</SectionTitle>
              <TrendingList>
                {filteredResources.slice(0, 5).map((record) => (
                  <StyledLink key={record.recordName} href={`/resource/${record.recordName}`}>
                    <ResourceItem $isDark={isDark}>
                      <ItemIcon $isDark={isDark}>
                        <MdDescription />
                      </ItemIcon>
                      <ItemTitle $isDark={isDark}>{record.fields.title?.value || "Untitled"}</ItemTitle>
                    </ResourceItem>
                  </StyledLink>
                ))}
              </TrendingList>
            </Section>
            <Section id="categories">
              <SectionTitle $isDark={isDark}>Categories</SectionTitle>
              <CategoryList>
                {displayCategories.map((category) => {
                  const IconComponent = categoryIcons[category.fields.name?.value || "Other"] || MdMoreHoriz;
                  return (
                    <StyledLink
                      key={category.recordName}
                      href={`/category/${category.fields.name?.value}`}
                    >
                      <CategoryItem $isDark={isDark}>
                        <ItemIcon $isDark={isDark}>
                          <IconComponent />
                        </ItemIcon>
                        <ItemTitle $isDark={isDark}>{category.fields.name?.value || "Unnamed"}</ItemTitle>
                      </CategoryItem>
                    </StyledLink>
                  );
                })}
              </CategoryList>
            </Section>
          </>
        )}
      </InnerContent>
    </CommunityContainer>
  );
}