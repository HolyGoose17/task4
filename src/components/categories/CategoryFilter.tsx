import { CategoryButton } from '../../modules/CategoryButton';

interface IProductCategories {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onSelect }: IProductCategories) => {
  return (
    <div className="mb-8">
      <h6 className="mb-4 text-center text-lg font-semibold text-gray-900">Categories</h6>

      <div className="flex justify-center flex-wrap gap-2.5">
        <CategoryButton category={null} selectedCategory={selectedCategory} onSelect={onSelect} />

        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};
