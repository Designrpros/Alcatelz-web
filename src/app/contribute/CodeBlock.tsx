import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '@/components/CopyButton';
import { useState, useRef, useEffect } from 'react';

const BlockWrapper = styled.div<{ $isDragging: boolean; $isDark: boolean; $isEditing: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f5f5f5')};
  border-radius: 6px;
  padding: 0.5rem;
  position: relative;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  transition: background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isEditing, $isDark }) =>
    $isEditing ? ($isDark ? '0 0 0 2px #666666' : '0 0 0 2px #999999') : 'none'};

  &:hover {
    background: ${({ $isDark }) => ($isDark ? '#3a3a3a' : '#e0e0e0')};
  }
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const CodeBlockContainer = styled.div<{ $isDark: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#2d2d2d')};
  border-radius: 4px;
`;

const CodeInput = styled.textarea<{ $isDark: boolean }>`
  width: 100%;
  padding: 1rem;
  padding-top: 2.5rem; /* Space for copy button */
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;
  border: none;
  background: transparent;
  color: ${({ $isDark }) => ($isDark ? '#000000' : '#ffffff')}; /* Ensure visibility */
  resize: vertical; /* Allow manual vertical resize */
  outline: none;
  line-height: 1.5;
  box-sizing: border-box;
  overflow-x: auto; /* Horizontal scroll */
  overflow-y: hidden; /* Disable vertical scrolling only */
  white-space: nowrap; /* Prevent wrapping */
  height: auto; /* Allow natural expansion */

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const HighlightedCode = styled.div`
  padding: 1rem;
  padding-top: 2.5rem; /* Space for copy button */
  cursor: text;
  overflow-x: auto; /* Horizontal scroll */
  white-space: nowrap; /* Prevent wrapping */
`;

interface CodeBlockProps {
  id: string;
  content: string;
  language?: string; /* Optional prop for language, defaults to 'typescript' */
  isDark: boolean;
  isDragging: boolean;
  onUpdateContent: (id: string, content: string) => void;
}

export default function CodeBlock({ 
  id, 
  content, 
  language = 'typescript', 
  isDark, 
  isDragging, 
  onUpdateContent 
}: CodeBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dynamically adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
    }
  }, [content, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <BlockWrapper $isDragging={isDragging} $isDark={isDark} $isEditing={isEditing}>
      <CodeBlockWrapper>
        <CodeBlockContainer $isDark={isDark}>
          <CopyButton code={content} />
          {isEditing ? (
            <CodeInput
              ref={textareaRef}
              $isDark={isDark}
              value={content}
              onChange={(e) => onUpdateContent(id, e.target.value)}
              onBlur={handleBlur}
              autoFocus
              placeholder="// Enter your code here..."
            />
          ) : (
            <HighlightedCode onClick={() => setIsEditing(true)}>
              <SyntaxHighlighter
                language={language} /* Dynamic language support */
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: 'transparent',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                  fontSize: '1rem',
                  fontFamily: "'Courier New', Courier, monospace'",
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                }}
                PreTag="div"
              >
                {content || '// Enter your code here...'}
              </SyntaxHighlighter>
            </HighlightedCode>
          )}
        </CodeBlockContainer>
      </CodeBlockWrapper>
    </BlockWrapper>
  );
}