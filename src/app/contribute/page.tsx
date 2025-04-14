// app/contribute/page.tsx
'use client';

import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import ContributeToolbar from './Toolbar';
import TextBlock from './TextBlock';
import CodeBlock from './CodeBlock';

const ContributeContainer = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#ffffff')};
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease;
  margin: 0;
  padding: 0;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
  padding-top: 4rem; /* Space for Navbar + Toolbar */
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0.5rem;
    padding-top: 3.5rem;
  }
  @media (max-width: 480px) {
    padding: 0.25rem;
    padding-top: 3rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const BlockArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
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
  width: 100%;
  box-sizing: border-box;
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

interface Block {
  id: string;
  type: 'text' | 'code';
  content: string;
}

export default function ContributePage() {
  const [isDark, setIsDark] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [resourceName, setResourceName] = useState<string>('');
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const addBlock = (type: 'text' | 'code') => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? '' : '// Enter your code here',
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
    setDraggingId(blocks[index].id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newBlocks = [...blocks];
      const [draggedBlock] = newBlocks.splice(dragItem.current, 1);
      newBlocks.splice(dragOverItem.current, 0, draggedBlock);
      setBlocks(newBlocks);
    }
    setDraggingId(null);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const handleSave = () => {
    // Placeholder save logic; implement as needed
    console.log('Saving resource:', {
      name: resourceName,
      category: selectedCategory,
      blocks: blocks,
    });
    // Example: You could send this to an API or CloudKit here
  };

  return (
    <ContributeContainer $isDark={isDark}>
      <MainContent>
        <ContentWrapper>
          <ContributeToolbar
            isDark={isDark}
            onAddText={() => addBlock('text')}
            onAddCode={() => addBlock('code')}
            onToggleDarkMode={toggleDarkMode}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            resourceName={resourceName}
            onSetResourceName={setResourceName}
            onSave={handleSave}
          />
          <BlockArea>
            {blocks.length === 0 ? (
              <DetailBlock $isDark={isDark}>
                <TextContent $isDark={isDark}>Start adding blocks to create your resource!</TextContent>
              </DetailBlock>
            ) : (
              blocks.map((block, index) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {block.type === 'text' ? (
                    <TextBlock
                      id={block.id}
                      content={block.content}
                      isDark={isDark}
                      isDragging={draggingId === block.id}
                      onUpdateContent={updateBlockContent}
                    />
                  ) : (
                    <CodeBlock
                      id={block.id}
                      content={block.content}
                      isDark={isDark}
                      isDragging={draggingId === block.id}
                      onUpdateContent={updateBlockContent}
                    />
                  )}
                </div>
              ))
            )}
          </BlockArea>
        </ContentWrapper>
      </MainContent>
    </ContributeContainer>
  );
}