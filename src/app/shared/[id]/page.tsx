'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import React from 'react';
import Image from 'next/image';
import { configureCloudKit } from '@/lib/cloudkit';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '@/components/CopyButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Styled components with a Medium-like design
const PageContainer = styled.div<{ $isDark: boolean }>`
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

const BlockWrapper = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const BlockLabel = styled.div<{ $isDark: boolean }>`
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TextContent = styled.div<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  margin: 0;
  white-space: pre-wrap;

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

const Header2Content = styled.h2<{ $isDark: boolean }>`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1f2937')};
  margin: 1rem 0 0.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Header3Content = styled.h3<{ $isDark: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1f2937')};
  margin: 1rem 0 0.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CaptionContent = styled.p<{ $isDark: boolean }>`
  font-size: 0.9rem;
  font-style: italic;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  margin: 0.5rem 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SubPageContent = styled.a<{ $isDark: boolean }>`
  font-size: 1.1rem;
  color: #9d845d;
  text-decoration: none;
  display: inline-block;
  margin: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #7b6a47;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FileContent = styled.a<{ $isDark: boolean }>`
  font-size: 1.1rem;
  color: #9d845d;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #7b6a47;
    text-decoration: underline;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ToggleWrapper = styled.div<{ $isDark: boolean }>`
  margin: 0.5rem 0;
  border-left: 2px solid ${({ $isDark }) => ($isDark ? '#444444' : '#e5e7eb')};
  padding-left: 1rem;
`;

const ToggleHeader = styled.div<{ $isDark: boolean; $isHeader?: boolean }>`
  font-size: 1.1rem;
  font-weight: ${({ $isHeader }) => ($isHeader ? 600 : 500)};
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease;
  }

  &.expanded svg {
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ToggleContent = styled.div<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
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
  padding-left: 0;
  list-style-type: none;

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

const TodoItem = styled.li<{ $isDark: boolean; $isCompleted: boolean }>`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: ${({ $isCompleted }) => ($isCompleted ? '"\\2713"' : '""')};
    position: absolute;
    left: 0;
    width: 1rem;
    height: 1rem;
    border: 2px solid ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
    border-radius: 3px;
    background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#ffffff')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: ${({ $isDark, $isCompleted }) => ($isCompleted ? ($isDark ? '#ffffff' : '#1f2937') : 'transparent')};
  }
`;

const ResourceContent = styled.div<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  margin: 0;
  padding: 1rem;
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f3f4f6')};
  border-radius: 8px;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1f2937')};
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  .label {
    font-weight: 500;
    color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
    margin-right: 0.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const TableContent = styled.div<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#1f2937')};
  margin: 0;

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.5rem 0;
  }

  th, td {
    border: 1px solid ${({ $isDark }) => ($isDark ? '#444444' : '#e5e7eb')};
    padding: 0.5rem;
    text-align: left;
  }

  th {
    background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f3f4f6')};
    font-weight: 600;
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

interface Block {
  id: string;
  type: string;
  content: string;
  order: number;
}

interface TodoItemData {
  id: string;
  isCompleted: boolean;
  text: string;
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
  const [isExpired, setIsExpired] = useState(false);

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
        console.log('Fetching SharedPage with recordName:', id);
        const container = await configureCloudKit();
        console.log('Container configured successfully');
        const publicDB = container.publicCloudDatabase;

        // Fetch the SharedPage record
        const response = await publicDB.fetchRecords({
          recordType: 'SharedPage',
          recordName: id
        } as { recordType: string; recordName?: string });

        console.log('FetchRecords response:', {
          records: response.records,
          hasRecords: response.records.length > 0,
        });
        if (response.records.length === 0) {
          console.log('No SharedPage records found for recordName:', id);
          setError('Page not found');
          setLoading(false);
          return;
        }

        const pageFields = response.records[0].fields;
        console.log('Page fields:', pageFields);

        // Check expiration date
        if (pageFields.expirationDate && pageFields.expirationDate.value) {
          const expirationDate = new Date(pageFields.expirationDate.value);
          const currentDate = new Date();
          if (currentDate > expirationDate) {
            console.log('Share link has expired:', expirationDate);
            setIsExpired(true);
            setLoading(false);
            return;
          }
        }

        setPageData(pageFields);

        // Fetch associated SharedImage records, but don't fail if this query fails
        try {
          const query = {
            recordType: 'SharedImage',
            filterBy: [{
              fieldName: 'sharedPageId',
              comparator: 'EQUALS',
              fieldValue: { value: id }
            }]
          };

          const imageResponse = await publicDB.performQuery(query);
          console.log('SharedImage query response:', {
            records: imageResponse.records,
            hasRecords: imageResponse.records.length > 0,
          });
          const imageMap: { [key: string]: string } = {};
          imageResponse.records.forEach(record => {
            const imageId = record.recordName;
            const asset = record.fields.imageAsset;
            if (asset && asset.value && asset.value.fileURL) {
              imageMap[imageId] = asset.value.fileURL;
              console.log(`Image found: ${imageId} -> ${asset.value.fileURL}`);
            } else {
              console.log(`No asset found for SharedImage record: ${imageId}`);
            }
          });
          setImages(imageMap);
        } catch (imageErr) {
          console.error('Error fetching SharedImage records:', imageErr);
          if (imageErr instanceof Error) {
            console.error('SharedImage error details:', {
              message: imageErr.message,
              stack: imageErr.stack,
            });
          }
          setImages({});
        }
      } catch (err) {
        console.error('Error fetching shared page:', err);
        if (err instanceof Error) {
          console.error('Error details:', {
            message: err.message,
            stack: err.stack,
          });
        }
        setError('Failed to load page: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    }

    fetchSharedPage();
  }, [id]);

  // Parse the content as a JSON array of blocks
  let blocks: Block[] = [];
  try {
    const contentValue = pageData?.content?.value;
    if (contentValue && contentValue !== '[]') {
      blocks = JSON.parse(contentValue) as Block[];
      blocks.sort((a, b) => a.order - b.order);
      console.log('Parsed blocks for shared page:', blocks);
    }
  } catch (e) {
    console.error('Failed to parse content JSON:', e);
    blocks = [];
  }

  if (loading) {
    return (
      <PageContainer $isDark={isDark}>
        <InnerContent>
          <StatusMessage $isDark={isDark}>Loading...</StatusMessage>
        </InnerContent>
      </PageContainer>
    );
  }

  if (isExpired) {
    return (
      <PageContainer $isDark={isDark}>
        <InnerContent>
          <BackButton $isDark={isDark} onClick={() => router.back()}>
            <MdArrowBack /> Back
          </BackButton>
          <Title $isDark={isDark}>Share Link Expired</Title>
          <StatusMessage $isDark={isDark}>
            This shared link has expired. Please request a new link from the content owner.
          </StatusMessage>
        </InnerContent>
      </PageContainer>
    );
  }

  if (error || !pageData) {
    return (
      <PageContainer $isDark={isDark}>
        <InnerContent>
          <StatusMessage $isDark={isDark}>Error loading shared page or page not found.</StatusMessage>
        </InnerContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer $isDark={isDark}>
      <InnerContent>
        <BackButton $isDark={isDark} onClick={() => router.back()}>
          <MdArrowBack /> Back
        </BackButton>
        <Title $isDark={isDark}>{pageData?.title?.value || 'Untitled Page'}</Title>
        {blocks.length === 0 ? (
          <StatusMessage $isDark={isDark}>No content available for this page.</StatusMessage>
        ) : (
          blocks.map((blockItem) => {
            // Generate unique key for toggle state to avoid hook issues
            const toggleKey = `toggle-${blockItem.id || Math.random()}`;
            const [isExpanded, setIsExpanded] = useState(false);
  
            // Safely access block properties
            const blockType = blockItem?.type?.toLowerCase() || '';
            const content = blockItem?.content || '';
  
            return (
              <BlockWrapper key={blockItem.id || `block-${Math.random()}`}>
                {(() => {
                  switch (blockType) {
                    case 'text':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Text:</BlockLabel>
                          <TextContent $isDark={isDark}>{content}</TextContent>
                        </>
                      );
                    case 'header2':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Header 2:</BlockLabel>
                          <Header2Content $isDark={isDark}>{content}</Header2Content>
                        </>
                      );
                    case 'header3':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Header 3:</BlockLabel>
                          <Header3Content $isDark={isDark}>{content}</Header3Content>
                        </>
                      );
                    case 'caption':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Caption:</BlockLabel>
                          <CaptionContent $isDark={isDark}>{content}</CaptionContent>
                        </>
                      );
                    case 'subpage':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Sub-Page:</BlockLabel>
                          <SubPageContent
                            $isDark={isDark}
                            href={content ? `/page/${encodeURIComponent(content)}` : '#'}
                            onClick={(e) => {
                              if (content) {
                                e.preventDefault();
                                try {
                                  router.push(`/page/${encodeURIComponent(content)}`);
                                } catch (err) {
                                  console.error('Navigation error:', err);
                                }
                              }
                            }}
                          >
                            {content || 'Untitled Sub-Page'} (Sub-Page)
                          </SubPageContent>
                        </>
                      );
                    case 'divider':
                      return <DividerContent $isDark={isDark} />;
                    case 'image':
                      try {
                        if (content && content.startsWith('[Image: SharedImage:')) {
                          const startIndex = '[Image: SharedImage:'.length;
                          const endIndex = content.indexOf(']', startIndex);
                          if (endIndex !== -1) {
                            const imageId = content.substring(startIndex, endIndex);
                            if (images && imageId in images) {
                              return (
                                <>
                                  <BlockLabel $isDark={isDark}>Image:</BlockLabel>
                                  <ImageContent src={images[imageId]} alt="Shared image" />
                                </>
                              );
                            } else {
                              console.warn(`Image not found for imageId: ${imageId}`);
                              return (
                                <>
                                  <BlockLabel $isDark={isDark}>Image:</BlockLabel>
                                  <TextContent $isDark={isDark}>Image not available</TextContent>
                                </>
                              );
                            }
                          }
                        }
                        console.warn(`Invalid image content: ${content}`);
                        return (
                          <>
                            <BlockLabel $isDark={isDark}>Image:</BlockLabel>
                            <TextContent $isDark={isDark}>Image not available</TextContent>
                          </>
                        );
                      } catch (e) {
                        console.error('Error rendering image block:', e);
                        return (
                          <>
                            <BlockLabel $isDark={isDark}>Image:</BlockLabel>
                            <TextContent $isDark={isDark}>Image rendering failed</TextContent>
                          </>
                        );
                      }
                    case 'todo':
                      try {
                        const todoItems = content ? JSON.parse(content) as TodoItemData[] : [];
                        return (
                          <>
                            <BlockLabel $isDark={isDark}>To-Do:</BlockLabel>
                            <TodoContent $isDark={isDark}>
                              {todoItems.length > 0 ? (
                                todoItems.map((item) => (
                                  <TodoItem
                                    $isDark={isDark}
                                    $isCompleted={item.isCompleted || false}
                                    key={item.id || `todo-${Math.random()}`}
                                  >
                                    {item.text || ''}
                                  </TodoItem>
                                ))
                              ) : (
                                <TextContent $isDark={isDark}>No to-do items available</TextContent>
                              )}
                            </TodoContent>
                          </>
                        );
                      } catch (e) {
                        console.error('Failed to parse To-Do JSON:', e);
                        return (
                          <>
                            <BlockLabel $isDark={isDark}>To-Do:</BlockLabel>
                            <TextContent $isDark={isDark}>Invalid to-do data</TextContent>
                          </>
                        );
                      }
                    case 'code':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Code:</BlockLabel>
                          <CodeBlockWrapper>
                            <CodeBlockContainer>
                              <CopyButton code={content} />
                              <SyntaxHighlighter
                                language="javascript"
                                style={vscDarkPlus}
                                customStyle={{
                                  marginTop: '1rem',
                                  borderRadius: '8px',
                                  padding: '1rem',
                                  backgroundColor: '#1e1e1e',
                                  position: 'relative',
                                  zIndex: 1,
                                  width: '100%',
                                  boxSizing: 'border-box',
                                }}
                                PreTag={CodeBlockContent}
                              >
                                {content || '// No code provided'}
                              </SyntaxHighlighter>
                            </CodeBlockContainer>
                          </CodeBlockWrapper>
                        </>
                      );
                    case 'resource':
                      try {
                        let resourceData: { title?: string; author?: string; summary?: string; content?: string; category?: string } = {};
                        resourceData = content ? JSON.parse(content) : {};
                        return (
                          <>
                            <BlockLabel $isDark={isDark}>Resource:</BlockLabel>
                            <ResourceContent $isDark={isDark}>
                              <h3>{resourceData.title || 'Untitled Resource'}</h3>
                              {resourceData.author && (
                                <p>
                                  <span className="label">Author:</span> {resourceData.author}
                                </p>
                              )}
                              {resourceData.summary && (
                                <p>
                                  <span className="label">Summary:</span> {resourceData.summary}
                                </p>
                              )}
                              {resourceData.content && (
                                <p>
                                  <span className="label">Content:</span> {resourceData.content}
                                </p>
                              )}
                              {resourceData.category && (
                                <p>
                                  <span className="label">Category:</span> {resourceData.category}
                                </p>
                              )}
                            </ResourceContent>
                          </>
                        );
                      } catch (e) {
                        console.error('Failed to parse Resource JSON:', e);
                        return (
                          <>
                            <BlockLabel $isDark={isDark}>Resource:</BlockLabel>
                            <TextContent $isDark={isDark}>{content || 'Invalid resource data'}</TextContent>
                          </>
                        );
                      }
                    case 'markdown':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Markdown:</BlockLabel>
                          <MarkdownContent $isDark={isDark}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || 'No markdown content'}</ReactMarkdown>
                          </MarkdownContent>
                        </>
                      );
                    case 'table':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Table:</BlockLabel>
                          <TableContent $isDark={isDark}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || 'No table content'}</ReactMarkdown>
                          </TableContent>
                        </>
                      );
                    case 'quote':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Quote:</BlockLabel>
                          <TextContent $isDark={isDark} style={{ fontStyle: 'italic', borderLeft: '4px solid #9d845d', paddingLeft: '1rem' }}>
                            {content || 'No quote provided'}
                          </TextContent>
                        </>
                      );
                    case 'video':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Video:</BlockLabel>
                          {content ? (
                            <video controls src={content} style={{ maxWidth: '100%', borderRadius: '8px', margin: '1rem 0' }} />
                          ) : (
                            <TextContent $isDark={isDark}>No video source provided</TextContent>
                          )}
                        </>
                      );
                    case 'bookmark':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>Bookmark:</BlockLabel>
                          <a
                            href={content || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#9d845d',
                              textDecoration: 'none',
                              fontSize: '1.1rem',
                              display: 'inline-block',
                              margin: '0.5rem 0',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                          >
                            {content || 'Bookmark'}
                          </a>
                        </>
                      );
                    case 'file':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>File:</BlockLabel>
                          <FileContent
                            $isDark={isDark}
                            href={content || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                            </svg>
                            {content ? 'Download File' : 'No file available'}
                          </FileContent>
                        </>
                      );
                    case 'headertoggle':
                    case 'normaltoggle':
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>{blockType === 'headertoggle' ? 'Header Toggle' : 'Normal Toggle'}:</BlockLabel>
                          <ToggleWrapper $isDark={isDark}>
                            <ToggleHeader
                              $isDark={isDark}
                              $isHeader={blockType === 'headertoggle'}
                              className={isExpanded ? 'expanded' : ''}
                              onClick={() => setIsExpanded(!isExpanded)}
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 17l5-5-5-5v10z" />
                              </svg>
                              {content.split('\n')[0] || 'Toggle'}
                            </ToggleHeader>
                            {isExpanded && (
                              <ToggleContent $isDark={isDark}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {content || 'No content'}
                                </ReactMarkdown>
                              </ToggleContent>
                            )}
                          </ToggleWrapper>
                        </>
                      );
                    default:
                      return (
                        <>
                          <BlockLabel $isDark={isDark}>{blockType || 'Unknown'} (Unsupported):</BlockLabel>
                          <TextContent $isDark={isDark}>
                            Content not available for this block type
                          </TextContent>
                        </>
                      );
                  }
                })()}
              </BlockWrapper>
            );
          })
        )}
      </InnerContent>
    </PageContainer>
  );
}