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
          // Continue rendering the page even if SharedImage query fails
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

  // Parse the content into blocks
  const parseContent = (content: string | undefined): Block[] => {
    if (!content) return [];

    console.log('Parsing content:', content);
    // Split content by double newlines to separate blocks
    const lines = content.split('\n\n');
    const blocks: Block[] = [];

    lines.forEach(line => {
      if (!line.trim()) return; // Skip empty lines

      if (line.startsWith('New Text Block')) {
        blocks.push({ type: 'Text', content: line });
      } else if (line.startsWith('To-Do:')) {
        blocks.push({ type: 'To-Do', content: line.substring(6).trim() }); // Remove "To-Do:" prefix
      } else if (line.startsWith('Code:')) {
        blocks.push({ type: 'Code', content: line.substring(5).trim() }); // Remove "Code:" prefix
      } else if (line.startsWith('Markdown:')) {
        blocks.push({ type: 'Markdown', content: line.substring(9).trim() }); // Remove "Markdown:" prefix
      } else if (line.startsWith('Quote:')) {
        blocks.push({ type: 'Quote', content: line.substring(6).trim() }); // Remove "Quote:" prefix
      } else if (line.startsWith('Video:')) {
        blocks.push({ type: 'Video', content: line.substring(6).trim() }); // Remove "Video:" prefix
      } else if (line.startsWith('Bookmark:')) {
        blocks.push({ type: 'Bookmark', content: line.substring(9).trim() }); // Remove "Bookmark:" prefix
      } else if (line.startsWith('----')) {
        blocks.push({ type: 'Divider' });
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
        blocks.push({ type: 'Text', content: line });
      }
    });

    console.log('Parsed blocks:', blocks);
    return blocks;
  };

  if (loading) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>Loading...</InnerContent>
      </ResourceContainer>
    );
  }

  if (isExpired) {
    return (
      <ResourceContainer $isDark={isDark}>
        <InnerContent>
          <BackButton $isDark={isDark} onClick={() => router.back()}>
            <MdArrowBack /> Back
          </BackButton>
          <Title $isDark={isDark}>Share Link Expired</Title>
          <TextContent $isDark={isDark}>
            This shared link has expired. Please request a new link from the content owner.
          </TextContent>
        </InnerContent>
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
            <React.Fragment key={index}>
              {block.type === 'Text' ? (
                <DetailBlock $isDark={isDark}>
                  <TextContent $isDark={isDark}>{block.content}</TextContent>
                </DetailBlock>
              ) : block.type === 'Code' ? (
                <CodeBlockWrapper>
                  <CodeBlockContainer>
                    <CopyButton code={block.content || ''} />
                    <SyntaxHighlighter
                      language="javascript"
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
                      {block.content || ''}
                    </SyntaxHighlighter>
                  </CodeBlockContainer>
                </CodeBlockWrapper>
              ) : block.type === 'Markdown' ? (
                <DetailBlock $isDark={isDark}>
                  <MarkdownContent $isDark={isDark}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.content || ''}</ReactMarkdown>
                  </MarkdownContent>
                </DetailBlock>
              ) : block.type === 'To-Do' ? (
                <DetailBlock $isDark={isDark}>
                  <TodoContent $isDark={isDark}>
                    {block.content?.split('\n').map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </TodoContent>
                </DetailBlock>
              ) : block.type === 'Quote' ? (
                <DetailBlock $isDark={isDark}>
                  <TextContent $isDark={isDark} style={{ fontStyle: 'italic' }}>
                    &gt; {block.content}
                  </TextContent>
                </DetailBlock>
              ) : block.type === 'Video' ? (
                <DetailBlock $isDark={isDark}>
                  <video controls src={block.content} style={{ maxWidth: '100%', borderRadius: '6px' }} />
                </DetailBlock>
              ) : block.type === 'Bookmark' ? (
                <DetailBlock $isDark={isDark}>
                  <a
                    href={block.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: isDark ? '#60a5fa' : '#2563eb',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {block.content}
                  </a>
                </DetailBlock>
              ) : block.type === 'Divider' ? (
                <DividerContent $isDark={isDark} />
              ) : block.type === 'image' && block.imageId && images[block.imageId] ? (
                <DetailBlock $isDark={isDark}>
                  <ImageContent src={images[block.imageId]} alt="Shared image" />
                </DetailBlock>
              ) : block.type === 'image' && block.path ? (
                <DetailBlock $isDark={isDark}>
                  <TextContent $isDark={isDark}>
                    [Image: {block.path}] <span className="text-sm">(Image not available)</span>
                  </TextContent>
                </DetailBlock>
              ) : (
                <DetailBlock $isDark={isDark}>
                  <TextContent $isDark={isDark}>{block.content}</TextContent>
                </DetailBlock>
              )}
            </React.Fragment>
          ))}
        </div>
      </InnerContent>
    </ResourceContainer>
  );
}