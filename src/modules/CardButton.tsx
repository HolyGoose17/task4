import { useNavigate } from '@tanstack/react-router';
import { FaHandSparkles } from 'react-icons/fa';
import { MdOutlineDescription } from 'react-icons/md';

import { Button } from './Button';

interface IProductActionButtonsProps {
  productId: number;
  onAddToCart: () => void;
}

export const CardButton = ({ productId, onAddToCart }: IProductActionButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate({ to: `/products/${productId}` })}
      >
        <MdOutlineDescription className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" onClick={onAddToCart}>
        <FaHandSparkles className="h-5 w-5" />
      </Button>
    </div>
  );
};
