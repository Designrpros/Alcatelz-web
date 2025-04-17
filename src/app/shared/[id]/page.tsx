'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import React from 'react';
import Image from 'next/image';
import { configureCloudKit } from '@/lib/cloudkit';

// Styled components (reused from resource page)
const ResourceContainer = styled.div<{ $isDark: boolean }>`
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

const DetailBlock = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f5f5f5')};
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

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

const TextContent = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ImageContent = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

interface Block {
  type: string;
  content?: string;
  imageId?: string;
  path?: string;
}

export default function SharedPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const { id } = params;
  const [pageData, setPageData] = useState<any>(null);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    async function fetchSharedPage() {
      try {
        const container = await configureCloudKit();
        const publicDB = container.publicCloudDatabase;

        // Fetch the SharedPage record with explicit type
        const response = await publicDB.fetchRecords({
          recordType: 'SharedPage',
          recordName: id
        } as { recordType: string; recordName?: string });

        if (response.records.length === 0) {
          setError('Page not found');
          setLoading(false);
          return;
        }

        const pageFields = response.records[0].fields;
        setPageData(pageFields);

        // Fetch associated SharedImage records
        const query = {
          recordType: 'SharedImage',
          filterBy: [{
            fieldName: 'sharedPageId',
            comparator: 'EQUALS',
            fieldValue: { value: id }
          }]
        };

        const imageResponse = await publicDB.performQuery(query);
        const imageMap: { [key: string]: string } = {};
        imageResponse.records.forEach(record => {
          const imageId = record.recordName;
          const asset = record.fields.imageAsset;
          if (asset && asset.value && asset.value.fileURL) {
            imageMap[imageId] = asset.value.fileURL;
          }
        });
        setImages(imageMap);
      } catch (err) {
        console.error('Error fetching shared page:', err);
        setError('Failed to load page: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    }

    fetchSharedPage();
  }, [id]);

  // Parse the content into blocks
  const parseContent = (content: string | undefined): Block[] => {
    if (!content) return [];

    // Split content by double newlines to separate blocks
    const lines = content.split('\n\n');
    const blocks: Block[] = [];

    lines.forEach(line => {
      if (!line.trim()) return; // Skip empty lines

      if (line.startsWith('New Text Block')) {
        blocks.push({ type: 'text', content: line });
      } else if (line.startsWith('[Image: SharedImage:')) {
        // Extract image ID between [Image: SharedImage: and ]
        const match = line.match(/\[Image: SharedImage:([^\]]+)\]/);
        if (match && match[1]) {
          blocks.push({ type: 'image', imageId: match[1] });
        }
      } else if (line.startsWith('[Image:')) {
        // Handle legacy local paths
        const match = line.match(/\[Image: ([^\]]+)\]/);
        if (match && match[1]) {
          blocks.push({ type: 'image', path: match[1] });
        }
      } else if (line.trim()) {
        // Treat any other non-empty line as text
        blocks.push({ type: 'text', content: line });
      }
    });

    return blocks;
  };

  if (loading) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>Loading...</InnerContent>
      </ResourceContainer>
    );
  }

  if (error || !pageData) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>Error loading shared page or page not found.</InnerContent>
      </ResourceContainer>
    );
  }

  const blocks = parseContent(pageData.content?.value);

  return (
    <ResourceContainer $isDark={isDark}>
      <InnerContent>
        <BackButton $isDark={isDark} onClick={() => router.back()}>
          <MdArrowBack /> Back
        </BackButton>
        <Title $isDark={isDark}>{pageData.title?.value || 'Untitled Page'}</Title>
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <DetailBlock key={index} $isDark={isDark}>
              {block.type === 'text' && (
                <TextContent $isDark={isDark}>{block.content}</TextContent>
              )}
              {block.type === 'image' && block.imageId && images[block.imageId] && (
                <div className="my-4">
                  <Image
                    src={images[block.imageId]}
                    alt="Shared image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-sm"
                    onError={(e) => {
                      console.error('Failed to load image:', block.imageId);
                      e.currentTarget.style.display = 'none'; // Hide the image on error
                    }}
                  />
                </div>
              )}
              {block.type === 'image' && block.path && (
                <TextContent $isDark={isDark}>
                  [Image: {block.path}] <span className="text-sm">(Image not available)</span>
                </TextContent>
              )}
            </DetailBlock>
          ))}
        </div>
      </InnerContent>
    </ResourceContainer>
  );
}