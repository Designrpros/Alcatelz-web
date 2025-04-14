'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { useCloudKitData } from '@/lib/hooks';
import Link from 'next/link';

// Styled components
const CommunityContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 1rem;
`;

const TrendingScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const ResourceCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryCard = styled(ResourceCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
`;

const CardIcon = styled.span`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  line-height: 1.2;
`;

// Categories with icons (mapped to CSS equivalents)
const categories = [
  { name: 'General', icon: '🌐' },
  { name: 'Tutorials', icon: '📖' },
  { name: 'Design', icon: '🎨' },
  { name: 'Coding', icon: '💻' },
  { name: 'Productivity', icon: '⏰' },
  { name: 'Business', icon: '💼' },
  { name: 'Education', icon: '🎓' },
  { name: 'Technology', icon: '⚙️' },
  { name: 'Science', icon: '🧪' },
  { name: 'Health', icon: '❤️' },
  { name: 'Lifestyle', icon: '🍃' },
  { name: 'Art', icon: '🖌️' },
  { name: 'Music', icon: '🎵' },
  { name: 'Photography', icon: '📸' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Research', icon: '🔍' },
  { name: 'Development', icon: '🔨' },
  { name: 'Marketing', icon: '📣' },
  { name: 'Management', icon: '👥' },
  { name: 'Other', icon: '⋯' },
];

export default function DataTab() {
  const { records, loading, error } = useCloudKitData('LibraryResource');
  const [searchText, setSearchText] = useState('');

  const filteredResources = searchText
    ? records.filter((record) =>
        record.fields.title.value.toLowerCase().includes(searchText.toLowerCase())
      )
    : records;

  return (
    <CommunityContainer>
      <Header>Community</Header>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error} (Verify 'LibraryResource' exists in CloudKit Dashboard)</p>}
      {!loading && !error && records.length === 0 && (
        <p>No community resources found. Check CloudKit Dashboard.</p>
      )}
      {!loading && !error && records.length > 0 && (
        <>
          <SearchInput
            type="text"
            placeholder="Search Community"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Section>
            <SectionTitle>Trending Resources</SectionTitle>
            <TrendingScroll>
              {filteredResources.slice(0, 5).map((record) => (
                <Link key={record.recordName} href={`/resource/${record.recordName}`} passHref>
                  <ResourceCard>
                    <CardIcon>📄</CardIcon>
                    <CardTitle>{record.fields.title.value}</CardTitle>
                  </ResourceCard>
                </Link>
              ))}
            </TrendingScroll>
          </Section>
          <Section>
            <SectionTitle>Categories</SectionTitle>
            <CategoryGrid>
              {categories.map((category) => {
                const categoryResources = filteredResources.filter(
                  (r) => r.fields.categoryName.value === category.name
                );
                return (
                  <Link key={category.name} href={`/category/${category.name}`} passHref>
                    <CategoryCard>
                      <CardIcon>{category.icon}</CardIcon>
                      <CardTitle>{category.name}</CardTitle>
                    </CategoryCard>
                  </Link>
                );
              })}
            </CategoryGrid>
          </Section>
        </>
      )}
    </CommunityContainer>
  );
}