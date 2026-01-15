import { FaHandSparkles } from 'react-icons/fa';
import { MdOutlineDescription } from 'react-icons/md';

import type { IProduct } from '../../types/types';

interface ProductCardProps {
  product: IProduct;
}

export const ProductsCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <div className="w-md shadow-btn hover:shadow-head">
        <img src={product.thumbnail} alt={product.title} className="h-56 object-contain" />
        <div className="p-10">
          <div className="flex justify-between items-center">
            <h1>{product.title}</h1>
            <h5>{product.price}</h5>
          </div>
          <p>
            {product.description.length > 100
              ? `${product.description.slice(0, 100)}...`
              : product.description}
          </p>
        </div>
        <div className="border border-gray-200"></div>
        <div>
          <div className="flex gap-2">
            <h2>Tags</h2>
            <div className="flex gap-2">
              {product.tags?.slice(0, 2).map((tag, index) => (
                <div key={index} color="success" aria-label={tag}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div>
            <button>
              <MdOutlineDescription />
            </button>
            <button>
              <FaHandSparkles />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
