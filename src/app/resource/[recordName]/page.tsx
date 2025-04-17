'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useCloudKitData } from '@/lib/hooks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect } from 'react';
import { MdArrowBack, MdExpandMore, MdExpandLess } from 'react-icons/md';
import React from 'react';
import CopyButton from '@/components/CopyButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

// Define the type for CloudKit records
interface CloudKitRecord {
  recordName: string;
  fields: {
    title?: { value: string };
    author?: { value: string };
    summary?: { value: string };
    categoryName?: { value: string };
    content?: { value: string };
    createdBy?: { value: string };
  };
}

// Styled components with a Medium-like design, using sans-serif font
const ResourceContainer = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#ffffff')};
  min-height: 100vh;
  padding: 3rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  transition: background 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    padding: 2rem 0.75rem;
  }
`;

const InnerContent = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const BackButton = styled.button<{ $isDark: boolean }>`
  background: none;
  border: none;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #9d845d;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1f2937')};
  margin-bottom: 2rem;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const SearchInput = styled.input<{ $isDark: boolean }>`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#444444' : '#e5e7eb')};
  border-radius: 8px;
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  &:focus {
    outline: none;
    border-color: #9d845d;
    box-shadow: 0 0 0 3px rgba(157, 132, 93, 0.2);
  }

  &::placeholder {
    color: ${({ $isDark }) => ($isDark ? '#6b7280' : '#9ca3af')};
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

const DetailBlock = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#4b5563')};

  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 0.3rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 0.25rem;
  }
`;

const Label = styled.span<{ $isDark: boolean }>`
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  margin-right: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const TextContent = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
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

const DropdownContainer = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f9fafb')};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#444444' : '#e5e7eb')};
  transition: background 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    padding: 0.75rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const DropdownHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 0;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  transition: color 0.3s ease;

  &:hover {
    color: #9d845d;
  }
`;

const DropdownTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const DropdownContent = styled.div<{ $isOpen: boolean; $isDark: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  padding-top: 0.5rem;
`;

const DropdownItem = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const BlockWrapper = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const BlockLabel = styled.div<{ $isDark: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
`;

const CodeBlockContainer = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
`;

const CodeBlockContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`;

const MarkdownContent = styled.div<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  margin: 0;

  & > * {
    margin: 0.5rem 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1f2937')};
    margin: 1rem 0 0.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  ul, ol {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  li {
    margin: 0.25rem 0;
  }

  code {
    background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f3f4f6')};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Menlo', monospace;
    font-size: 0.95rem;
  }

  pre {
    background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f3f4f6')};
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }

  a {
    color: #9d845d;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #7b6a47;
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const TodoContent = styled.ul<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: disc;

  li {
    margin: 0.5rem 0;
  }

  @media (max-width: 1024px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const ImageContent = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DividerContent = styled.hr<{ $isDark: boolean }>`
  border: 0;
  border-top: 1px solid ${({ $isDark }) => ($isDark ? '#444444' : '#e5e7eb')};
  margin: 2rem 0;
`;

const ResourceContent = styled.a<{ $isDark: boolean }>`
  font-size: 1.1rem;
  color: #9d845d;
  text-decoration: none;
  margin: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #7b6a47;
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const StatusMessage = styled.div<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  text-align: center;
  padding: 2rem;
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f3f4f6')};
  border-radius: 8px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const CategoryLink = styled(Link)`
  color: #9d845d;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #7b6a47;
    text-decoration: underline;
  }
`;

interface Block {
  id: string;
  type: string;
  content: string;
  order: number;
}

export default function ResourceDetailPage({ params: paramsPromise }: { params: Promise<{ recordName: string }> }) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const { recordName } = params;
  const { records, loading, error } = useCloudKitData('CD_ResourceEntity') as {
    records: CloudKitRecord[];
    loading: boolean;
    error: string | null;
  };
  const resource = records.find((r: CloudKitRecord) => r.recordName === recordName);
  const [isDark, setIsDark] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!loading && resource) {
      console.log('Resource details:', {
        id: resource.recordName,
        title: resource.fields.title?.value,
        author: resource.fields.author?.value,
        categoryName: resource.fields.categoryName?.value,
        content: resource.fields.content?.value,
      });
    }
  }, [loading, resource]);

  if (loading) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>
          <StatusMessage $isDark={isDark}>Loading...</StatusMessage>
        </InnerContent>
      </ResourceContainer>
    );
  }

  if (error || !resource) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>
          <StatusMessage $isDark={isDark}>Error loading resource or resource not found.</StatusMessage>
        </InnerContent>
      </ResourceContainer>
    );
  }

  // Parse content JSON
  let blocks: Block[] = [];
  try {
    const contentValue = resource.fields.content?.value;
    if (contentValue && contentValue !== '[]') {
      let decodedContent = contentValue;
      try {
        // Check if content is base64-encoded
        if (/^[A-Za-z0-9+/=]+$/.test(contentValue)) {
          const binaryString = atob(contentValue);
          decodedContent = binaryString;
        }
        blocks = JSON.parse(decodedContent) as Block[];
      } catch {
        blocks = JSON.parse(contentValue) as Block[];
      }
      blocks.sort((a, b) => a.order - b.order);
      console.log('Parsed blocks for resource', recordName, ':', blocks);
    }
  } catch (e) {
    console.error('Failed to parse content JSON:', e);
  }

  // Filter blocks based on search
  const filteredBlocks = searchText
    ? blocks.filter((block) =>
        block.content.toLowerCase().includes(searchText.toLowerCase())
      )
    : blocks;

  return (
    <ResourceContainer $isDark={isDark}>
      <InnerContent>
        <BackButton $isDark={isDark} onClick={() => router.back()}>
          <MdArrowBack /> Back
        </BackButton>
        <Title $isDark={isDark}>{resource.fields.title?.value || 'Untitled'}</Title>
        <DetailBlock $isDark={isDark}>
          <Label $isDark={isDark}>Author:</Label>
          <TextContent $isDark={isDark}>{resource.fields.author?.value || 'Unknown'}</TextContent>
        </DetailBlock>
        {resource.fields.summary?.value && (
          <DetailBlock $isDark={isDark}>
            <Label $isDark={isDark}>Summary:</Label>
            <TextContent $isDark={isDark}>{resource.fields.summary.value}</TextContent>
          </DetailBlock>
        )}
        <DetailBlock $isDark={isDark}>
          <Label $isDark={isDark}>Category:</Label>
          <TextContent $isDark={isDark}>
            <CategoryLink href={`/category/${resource.fields.categoryName?.value || 'Other'}`}>
              {resource.fields.categoryName?.value || 'Uncategorized'}
            </CategoryLink>
          </TextContent>
        </DetailBlock>
        <DropdownContainer $isDark={isDark}>
          <DropdownHeader $isDark={isDark} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <DropdownTitle>More Details</DropdownTitle>
            {isDropdownOpen ? <MdExpandLess /> : <MdExpandMore />}
          </DropdownHeader>
          <DropdownContent $isOpen={isDropdownOpen} $isDark={isDark}>
            <DropdownItem $isDark={isDark}>
              <Label $isDark={isDark}>Created By:</Label>
              <TextContent $isDark={isDark}>{resource.fields.createdBy?.value || 'Unknown'}</TextContent>
            </DropdownItem>
          </DropdownContent>
        </DropdownContainer>
        <SearchInput
          $isDark={isDark}
          type="text"
          placeholder="Search within resource"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {filteredBlocks.length === 0 ? (
          <StatusMessage $isDark={isDark}>No matching content found.</StatusMessage>
        ) : (
          filteredBlocks.map((blockItem) => (
            <BlockWrapper key={blockItem.id}>
              {blockItem.type === 'Text' ? (
                <>
                  <BlockLabel $isDark={isDark}>Text:</BlockLabel>
                  <TextContent $isDark={isDark}>{blockItem.content}</TextContent>
                </>
              ) : blockItem.type === 'Code' ? (
                <>
                  <BlockLabel $isDark={isDark}>Code:</BlockLabel>
                  <CodeBlockWrapper>
                    <CodeBlockContainer>
                      <CopyButton code={blockItem.content} />
                      <SyntaxHighlighter
                        language="swift"
                        style={vscDarkPlus}
                        customStyle={{
                          marginTop: '1rem',
                          borderRadius: '8px',
                          padding: '1rem',
                          backgroundColor: isDark ? '#2d2d2d' : '#f3f4f6',
                          position: 'relative',
                          zIndex: 1,
                          width: '100%',
                          boxSizing: 'border-box',
                        }}
                        PreTag={CodeBlockContent}
                      >
                        {blockItem.content}
                      </SyntaxHighlighter>
                    </CodeBlockContainer>
                  </CodeBlockWrapper>
                </>
              ) : blockItem.type === 'Markdown' ? (
                <>
                  <BlockLabel $isDark={isDark}>Markdown:</BlockLabel>
                  <MarkdownContent $isDark={isDark}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{blockItem.content}</ReactMarkdown>
                  </MarkdownContent>
                </>
              ) : blockItem.type === 'To-Do' ? (
                <>
                  <BlockLabel $isDark={isDark}>To-Do:</BlockLabel>
                  <TodoContent $isDark={isDark}>
                    {(() => {
                      try {
                        const items = JSON.parse(blockItem.content);
                        if (Array.isArray(items)) {
                          return items.map((item: string, idx: number) => (
                            <li key={idx}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
                          ));
                        }
                      } catch {
                        return blockItem.content.split('\n').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ));
                      }
                      return <li>{blockItem.content}</li>;
                    })()}
                  </TodoContent>
                </>
              ) : blockItem.type === 'image' ? (
                <>
                  <BlockLabel $isDark={isDark}>Image:</BlockLabel>
                  {blockItem.content.startsWith('http') ? (
                    <ImageContent src={blockItem.content} alt="Resource Image" />
                  ) : (
                    <TextContent $isDark={isDark}>Invalid image URL</TextContent>
                  )}
                </>
              ) : blockItem.type === 'Divider' ? (
                <DividerContent $isDark={isDark} />
              ) : blockItem.type === 'Resource' ? (
                <>
                  <BlockLabel $isDark={isDark}>Resource:</BlockLabel>
                  <ResourceContent
                    $isDark={isDark}
                    href={blockItem.content.startsWith('http') ? blockItem.content : `/resource/${blockItem.content}`}
                  >
                    {blockItem.content}
                  </ResourceContent>
                </>
              ) : (
                <>
                  <BlockLabel $isDark={isDark}>{blockItem.type} (Unsupported):</BlockLabel>
                  <TextContent $isDark={isDark}>{blockItem.content}</TextContent>
                </>
              )}
            </BlockWrapper>
          ))
        )}
      </InnerContent>
    </ResourceContainer>
  );
}