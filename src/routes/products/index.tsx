import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { CategoryFilter } from '../../components/categories/CategoryFilter';
import { ProductsCard } from '../../components/products/ProductsCard';
import type { IProduct, IProductResponse } from '../../types/types';

export const Route = createFileRoute('/products/')({
  component: ProductsListPage,
});

function ProductsListPage() {
  const { isPending, error, data } = useQuery<IProduct[]>({
    queryKey: ['Product'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data: IProductResponse = await res.json();
      return data.products;
    },
  });

  const categories = Array.from(new Set(data?.map((prod) => prod.category)));

  if (error) {
    return <div>Ошибка получения данных</div>;
  }
  return (
    <div className=" mt-36 flex flex-wrap items-center gap-2">
      {isPending ? (
        <div>Продукты загружаются</div>
      ) : (
        <>
          <CategoryFilter categories={categories} />
          {data?.map((product) => (
            <ProductsCard product={product} key={product.id} />
          ))}
        </>
      )}
    </div>
  );
}
