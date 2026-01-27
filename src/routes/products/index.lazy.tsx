import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { useGetProductByCategory } from '../../api/useGetProductByCategory';
import { useGetProducts } from '../../api/useGetProducts';
import { CategoryFilter } from '../../components/categories/CategoryFilter';
import { ProductsCard } from '../../components/products/ProductsCard';

export const Route = createLazyFileRoute('/products/')({
  component: ProductsListPage,
});

function ProductsListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetProducts();

  const categories = Array.from(new Set(data?.map((prod) => prod.category) ?? []));

  const { data: productsByCategory } = useGetProductByCategory(selectedCategory || undefined);

  const productsToRender =
    selectedCategory && productsByCategory ? productsByCategory : (data ?? []);

  if (isError) {
    return <div className="mt-8 text-center text-red-600">Error loading products</div>;
  }

  return (
    <div className=" mt-14 flex flex-wrap items-center justify-center gap-2">
      {isLoading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      ) : (
        <>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <div className="flex flex-wrap justify-center gap-4 mb-7.5">
            {productsToRender?.map((product) => (
              <ProductsCard product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
