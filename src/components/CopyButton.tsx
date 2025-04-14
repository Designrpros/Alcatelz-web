// src/components/CopyButton.tsx
'use client';

import styled from 'styled-components';
import { MdContentCopy } from 'react-icons/md';
import { useState, useEffect } from 'react';

const CopyButtonStyled = styled.button<{ $isDark: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  background-color: ${({ $isDark }) => ($isDark ? '#9d845d' : '#7a6644')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${({ $isDark }) => ($isDark ? '#7a6644' : '#9d845d')};
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyCode = () => {
    if (!isClient) {
      console.error('Cannot copy: Not running on the client side.');
      return;
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (successful) {
        alert('Code copied to clipboard!');
      } else {
        alert('Failed to copy code. Please copy it manually.');
      }
    } catch (err) {
      console.error('Copy failed: ', err);
      alert('Failed to copy code. Please copy it manually.');
    }
  };

  return (
    <CopyButtonStyled $isDark={true} onClick={handleCopyCode} disabled={!isClient}>
      <MdContentCopy size={20} />
    </CopyButtonStyled>
  );
}