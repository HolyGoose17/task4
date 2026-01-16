import { FaHandSparkles } from 'react-icons/fa';
import { MdOutlineDescription } from 'react-icons/md';

import type { ProductCardProps } from '../../types/types';

export const ProductsCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <div className="w-118 rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-55 w-full cursor-pointer object-contain p-4"
        />
        <div className="mw- px-2 pb-2">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-sm font-bold text-gray-900">{product.title}</h1>
            <h5 className="text-base font-light text-gray-900">$ {product.price}</h5>
          </div>
          <p className="min-h-10 text-sm text-gray-500">
            {product.description.length > 100
              ? `${product.description.slice(0, 100)}...`
              : product.description}
          </p>
        </div>
        <hr className="border-gray-200" />
        <div className="m-1 flex max-h-18.75 items-center justify-between p-4">
          <div className="flex flex-col">
            <h2 className="mb-1 text-sm text-gray-700">Tags</h2>
            <div className="flex gap-2">
              {product.tags?.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  aria-label={tag}
                  className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-md text-blue-400 hover:bg-gray-100 cursor-pointer">
              <MdOutlineDescription className="h-5 w-5" />
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-md text-blue-400 hover:bg-gray-100 cursor-pointer">
              <FaHandSparkles className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
