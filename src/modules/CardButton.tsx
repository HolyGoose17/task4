import { useNavigate } from '@tanstack/react-router';
import { MdOutlineDescription } from 'react-icons/md';

import { Button } from './Button';

interface IProductActionButtonsProps {
  productId: number;
}

export const CardButton = ({ productId }: IProductActionButtonsProps) => {
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
    </div>
  );
};
