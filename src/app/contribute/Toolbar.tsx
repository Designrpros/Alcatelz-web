import styled from 'styled-components';
import { MdTextFields, MdCode, MdBrightness4, MdBrightness7, MdSave } from 'react-icons/md';
import { categories } from '@/data/categories';

const Toolbar = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#2d2d2d' : '#f5f5f5')};
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 70px; /* Height of Navbar */
  z-index: 1000; /* Below Navbar (z-index: 1100) */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.25rem;
    top: 50px; /* Adjusted for smaller Navbar padding */
  }
  @media (max-width: 480px) {
    gap: 0.25rem;
    padding: 0.125rem;
    top: 45px; /* Further adjusted for phone */
  }
`;

const Breadcrumb = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};
  font-size: 1rem;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 0.25rem;
    span {
      display: none;
    }
  }
`;

const CategorySelect = styled.select<{ $isDark: boolean }>`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: ${({ $isDark }) => ($isDark ? '#333' : '#fff')};
  color: ${({ $isDark }) => ($isDark ? '#ddd' : '#333')};
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  width: 150px;
  max-width: 100%;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.4rem;
  }
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem;
  }
  &:focus {
    outline: none;
  }
`;

const NameInput = styled.input<{ $isDark: boolean }>`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: ${({ $isDark }) => ($isDark ? '#333' : '#fff')};
  color: ${({ $isDark }) => ($isDark ? '#ddd' : '#333')};
  font-size: 1rem;
  width: 200px;
  max-width: 100%;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.4rem;
  }
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const ToolbarButton = styled.button<{ $isDark: boolean }>`
  background: none;
  border: none;
  color: ${({ $isDark }) => ($isDark ? '#cccccc' : '#666666')};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#333333')};
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.2rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.15rem;
  }
`;

const SaveButton = styled(ToolbarButton)`
  /* Inherits from ToolbarButton */
`;

interface ToolbarProps {
  isDark: boolean;
  onAddText: () => void;
  onAddCode: () => void;
  onToggleDarkMode: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  resourceName: string;
  onSetResourceName: (name: string) => void;
  onSave: () => void; /* New prop for save action */
}

export default function ContributeToolbar({
  isDark,
  onAddText,
  onAddCode,
  onToggleDarkMode,
  selectedCategory,
  onSelectCategory,
  resourceName,
  onSetResourceName,
  onSave,
}: ToolbarProps) {
  return (
    <Toolbar $isDark={isDark}>
      <Breadcrumb $isDark={isDark}>
        <CategorySelect
          $isDark={isDark}
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </CategorySelect>
      </Breadcrumb>
      <NameInput
        $isDark={isDark}
        type="text"
        value={resourceName}
        onChange={(e) => onSetResourceName(e.target.value)}
        placeholder="Resource Name"
      />
      <SaveButton $isDark={isDark} onClick={onSave}>
        <MdSave />
      </SaveButton>
      <div style={{ flex: 1 }} />
      <ButtonGroup>
        <ToolbarButton $isDark={isDark} onClick={onAddText}>
          <MdTextFields />
        </ToolbarButton>
        <ToolbarButton $isDark={isDark} onClick={onAddCode}>
          <MdCode />
        </ToolbarButton>
        <ToolbarButton $isDark={isDark} onClick={onToggleDarkMode}>
          {isDark ? <MdBrightness7 /> : <MdBrightness4 />}
        </ToolbarButton>
      </ButtonGroup>
    </Toolbar>
  );
}