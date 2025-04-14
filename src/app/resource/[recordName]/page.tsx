// app/resource/[recordName]/page.tsx
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

// Styled components (exactly as provided)
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

const Label = styled.span<{ $isDark: boolean }>`
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#888888')};
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
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

const DropdownContainer = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f5f5f5')};
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  transition: background 0.2s ease;

  @media (max-width: 1024px) {
    padding: 0.4rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
  }
`;

const DropdownHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.25rem 0;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};
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
  padding-top: 0.25rem;
`;

const DropdownItem = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 0.25rem;
  width: 100%;
  box-sizing: border-box;
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
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;

  & > * {
    margin: 0.25rem 0;
  }

  code {
    background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#e5e7eb')};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }

  pre {
    background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#e5e7eb')};
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

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

const TodoContent = styled.ul<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: disc;

  li {
    margin: 0.25rem 0;
  }

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

const DividerContent = styled.hr<{ $isDark: boolean }>`
  border: 0;
  border-top: 1px solid ${({ $isDark }) => ($isDark ? '#444444' : '#cccccc')};
  margin: 0.5rem 0;
`;

const ResourceContent = styled.a<{ $isDark: boolean }>`
  font-size: 1rem;
  color: ${({ $isDark }) => ($isDark ? '#60a5fa' : '#2563eb')};
  text-decoration: none;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }

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
  const { records, loading, error } = useCloudKitData('CD_ResourceEntity');
  const resource = records.find((r) => r.recordName === recordName);
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
        <InnerContent>Loading...</InnerContent>
      </ResourceContainer>
    );
  }

  if (error || !resource) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>Error loading resource or resource not found.</InnerContent>
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
            <Link href={`/category/${resource.fields.categoryName?.value || 'Other'}`}>
              {resource.fields.categoryName?.value || 'Uncategorized'}
            </Link>
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
          <DetailBlock $isDark={isDark}>
            <TextContent $isDark={isDark}>No matching content found.</TextContent>
          </DetailBlock>
        ) : (
          filteredBlocks.map((blockItem) => (
            <React.Fragment key={blockItem.id}>
              {blockItem.type === 'Text' ? (
                <DetailBlock $isDark={isDark}>
                  <Label $isDark={isDark}>Text:</Label>
                  <TextContent $isDark={isDark}>{blockItem.content}</TextContent>
                </DetailBlock>
              ) : blockItem.type === 'Code' ? (
                <CodeBlockWrapper>
                  <CodeBlockContainer>
                    <CopyButton code={blockItem.content} />
                    <SyntaxHighlighter
                      language="swift"
                      style={vscDarkPlus}
                      customStyle={{
                        marginTop: '1rem',
                        borderRadius: '4px',
                        padding: '1rem',
                        backgroundColor: isDark ? '#1f2937' : '#2d2d2d',
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
              ) : blockItem.type === 'Markdown' ? (
                <DetailBlock $isDark={isDark}>
                  <Label $isDark={isDark}>Markdown:</Label>
                  <MarkdownContent $isDark={isDark}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{blockItem.content}</ReactMarkdown>
                  </MarkdownContent>
                </DetailBlock>
              ) : blockItem.type === 'To-Do' ? (
                <DetailBlock $isDark={isDark}>
                  <Label $isDark={isDark}>To-Do:</Label>
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
                </DetailBlock>
              ) : blockItem.type === 'image' ? (
                <DetailBlock $isDark={isDark}>
                  <Label $isDark={isDark}>Image:</Label>
                  {blockItem.content.startsWith('http') ? (
                    <ImageContent src={blockItem.content} alt="Resource Image" />
                  ) : (
                    <TextContent $isDark={isDark}>Invalid image URL</TextContent>
                  )}
                </DetailBlock>
              ) : blockItem.type === 'Divider' ? (
                <DividerContent $isDark={isDark} />
              ) : blockItem.type === 'Resource' ? (
                <DetailBlock $isDark={isDark}>
                  <Label $isDark={isDark}>Resource:</Label>
                  <ResourceContent
                    $isDark={isDark}
                    href={blockItem.content.startsWith('http') ? blockItem.content : `/resource/${blockItem.content}`}
                  >
                    {blockItem.content}
                  </ResourceContent>
                </DetailBlock>
              ) : (
                <DetailBlock $isDark={isDark}>
                  <Label $isDark={isDark}>{blockItem.type} (Unsupported):</Label>
                  <TextContent $isDark={isDark}>{blockItem.content}</TextContent>
                </DetailBlock>
              )}
            </React.Fragment>
          ))
        )}
      </InnerContent>
    </ResourceContainer>
  );
}