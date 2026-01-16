import type { FC } from 'react';

import type { IProductCategories } from '../../types/types';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelect,
}: IProductCategories) => {
  return (
    <div className="mb-8">
      <h6 className="mb-4 text-center text-lg font-semibold text-gray-900">Categories</h6>

      <div className="flex justify-center flex-wrap gap-2.5">
        <button
          className={`border-inherit rounded-md px-4 py-2 text-sm font-medium transition cursor-pointer
            ${
              selectedCategory === null
                ? 'bg-blue-400 text-black'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          onClick={() => onSelect(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            className={`border-inherit rounded-md px-4 py-2 text-sm font-medium transition cursor-pointer
              ${
                selectedCategory === category
                  ? 'bg-blue-400 text-black'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            key={category}
            onClick={() => onSelect(category)}
          >
            <h2>{category}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};
