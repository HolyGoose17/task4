import type { IProductCategories } from '../../types/types';

export const CategoryFilter = ({ categories, selectedCategory, onSelect }: IProductCategories) => {
  return (
    <div className="mb-4">
      <h6 className="mb-4 text-center">Categories</h6>

      <div className="flex justify-center flex-wrap">
        <button onClick={() => onSelect(null)}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => onSelect(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
