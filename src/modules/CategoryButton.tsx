import { Button } from './Button';

interface CategoryButtonProps {
  category: string | null;
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export const CategoryButton = ({ category, selectedCategory, onSelect }: CategoryButtonProps) => {
  const isActive = selectedCategory === category;

  return (
    <Button variant={isActive ? 'active' : 'outline'} size="md" onClick={() => onSelect(category)}>
      {category ?? 'All'}
    </Button>
  );
};
