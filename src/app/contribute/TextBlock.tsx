// app/contribute/TextBlock.tsx
import styled from 'styled-components';

const BlockWrapper = styled.div<{ $isDragging: boolean; $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f5f5f5')};
  border-radius: 6px;
  padding: 0.5rem;
  position: relative;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $isDark }) => ($isDark ? '#3a3a3a' : '#e0e0e0')};
  }
`;

const TextBlockInput = styled.textarea<{ $isDark: boolean }>`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  background: transparent;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  resize: vertical;
  outline: none;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

interface TextBlockProps {
  id: string;
  content: string;
  isDark: boolean;
  isDragging: boolean;
  onUpdateContent: (id: string, content: string) => void;
}

export default function TextBlock({ id, content, isDark, isDragging, onUpdateContent }: TextBlockProps) {
  return (
    <BlockWrapper $isDragging={isDragging} $isDark={isDark}>
      <TextBlockInput
        $isDark={isDark}
        value={content}
        onChange={(e) => onUpdateContent(id, e.target.value)}
        placeholder="Enter text here..."
      />
    </BlockWrapper>
  );
}