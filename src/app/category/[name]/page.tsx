// app/category/[name]/page.tsx
'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useCloudKitData } from '@/lib/hooks';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdArrowBack, MdDescription } from 'react-icons/md';

// Styled components (exactly as provided)
const CategoryContainer = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#ffffff')};
  padding: 1rem 0;
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.75rem 0;
  }
`;

const InnerContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 0.5rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 0.25rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

const BackButton = styled.button<{ $isDark: boolean }>`
  background: none;
  border: none;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#333333')};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: 2.25rem;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  margin-bottom: 0.5rem;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
  }
`;

const Description = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};
  margin-bottom: 0.5rem;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
  }
`;

const SearchInput = styled.input<{ $isDark: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#333333' : '#cccccc')};
  border-radius: 6px;
  margin-bottom: 1rem;
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ $isDark }) => ($isDark ? '#666666' : '#999999')};
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
    padding: 0.65rem 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
  }
`;

const ResourceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 0.25rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;

const ResourceItem = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f5f5f5')};
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ $isDark }) => ($isDark ? '#3a3a3a' : '#e0e0e0')};
    transform: translateY(-3px);
  }

  @media (max-width: 1024px) {
    padding: 0.4rem;
    gap: 0.4rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
    gap: 0.25rem;
  }
`;

const ResourceIcon = styled.div<{ $isDark: boolean }>`
  font-size: 2rem;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ResourceInfo = styled.div`
  flex: 1;
`;

const ResourceTitle = styled.h3<{ $isDark: boolean }>`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ResourceAuthor = styled.p<{ $isDark: boolean }>`
  font-size: 0.9rem;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#888888')};
  margin: 0.25rem 0 0;

  @media (max-width: 1024px) {
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const ResourceSummary = styled.p<{ $isDark: boolean }>`
  font-size: 0.85rem;
  color: ${({ $isDark }) => ($isDark ? '#999999' : '#666666')};
  margin: 0.25rem 0 0;
  line-height: 1.4;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const EmptyState = styled.div<{ $isDark: boolean }>`
  text-align: center;
  padding: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const EmptyIcon = styled.span`
  font-size: 2rem;
`;

const EmptyTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.5rem;
  margin: 0.5rem 0 0.25rem;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const EmptyMessage = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#999999' : '#888888')};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const categoryDescriptions: { [key: string]: string } = {
  General: 'A collection of miscellaneous resources for all interests.',
  Tutorials: 'Step-by-step guides and how-tos for learning new skills.',
  Design: 'Inspiration and tools for creative design projects.',
  Coding: 'Resources for programmers and developers.',
  Productivity: 'Tips and tools to boost your efficiency.',
  Business: 'Strategies and insights for entrepreneurs and professionals.',
  Education: 'Materials for teaching and learning.',
  Technology: 'Latest trends and tools in tech.',
  Science: 'Discoveries and studies in the scientific world.',
  Health: 'Guides for wellness and healthy living.',
  Lifestyle: 'Ideas for enhancing your daily life.',
  Art: 'Resources for artists and art enthusiasts.',
  Music: 'Everything from theory to production for musicians.',
  Photography: 'Tips and techniques for photographers.',
  Writing: 'Tools and inspiration for writers.',
  Research: 'Methods and findings for researchers.',
  Development: 'Resources for software and app development.',
  Marketing: 'Strategies to promote and grow your brand.',
  Management: 'Leadership and organizational skills.',
  Other: 'Unique resources that don’t fit elsewhere.',
};

export default function CategoryDetailPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const { name } = params;
  const { records, loading, error } = useCloudKitData('CD_ResourceEntity');
  const [searchText, setSearchText] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log('Category records loaded:', records.length);
      console.log('Filtering for category:', name);
      console.log('Available categories:', Array.from(new Set(records.map(r => r.fields.categoryName?.value).filter(Boolean))));
    }
  }, [loading, records, name]);

  const filteredResources = searchText
    ? records.filter(
        (r) =>
          (r.fields.categoryName?.value || '').toLowerCase() === name.toLowerCase() &&
          (r.fields.title?.value || '').toLowerCase().includes(searchText.toLowerCase())
      )
    : records.filter(
        (r) => (r.fields.categoryName?.value || '').toLowerCase() === name.toLowerCase()
      );

  if (loading) {
    return (
      <CategoryContainer $isDark={isDark}>
        <InnerContent>Loading...</InnerContent>
      </CategoryContainer>
    );
  }

  if (error) {
    return (
      <CategoryContainer $isDark={isDark}>
        <InnerContent>Error loading resources: {error}</InnerContent>
      </CategoryContainer>
    );
  }

  return (
    <CategoryContainer $isDark={isDark}>
      <InnerContent>
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
                    <ResourceTitle $isDark={isDark}>{resource.fields.title?.value || 'Untitled'}</ResourceTitle>
                    <ResourceAuthor $isDark={isDark}>
                      Author: {resource.fields.author?.value || 'Unknown'}
                    </ResourceAuthor>
                    <ResourceSummary $isDark={isDark}>
                      {resource.fields.summary?.value || 'No summary available'}
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