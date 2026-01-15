import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { MdClose } from 'react-icons/md';

import type { IProduct } from '../../types/types';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const productId = useParams({
    from: '/products/$productId',
    select: (params) => params.productId,
  });

  const { isPending, error, data } = useQuery<IProduct, never>({
    queryKey: ['ProductId', 'ProductDetails'],
    queryFn: () => fetch(`https://dummyjson.com/products/${productId}`).then((res) => res.json()),
  });

  if (error) {
    return <div>Ошибка получения данных</div>;
  }

  return (
    <div className="mt-9/100">
      {isPending ? (
        <div className="w-full flex justify-center mt-6">
          <div>Данные прогружаются</div>
        </div>
      ) : (
        <div className="w-3/4 mx-auto my-6 px-2">
          <div className="flex xs:flex-col md:flex-row shadow-btn border-inherit rounded-2xl">
            <img
              src={data?.thumbnail}
              alt={data?.title}
              className="@max-xs:w-full md:w-96 @max-xs:h-64 md:h-full object-contain bg-bgc"
            />
            <div className="relative px-8 py-8 flex-1">
              <MdClose
                aria-label="Close details"
                onClick={() => console.log('Переход назад')}
                className="absolute top-32 right-32"
              />
              <h4>{data?.title}</h4>
              <h5>{data?.price}</h5>
              <div>
                <img src="" alt="" />
                <h5>{data?.rating} / 5</h5>
              </div>
              <p>{data?.description}</p>
              {data?.tags && (
                <div>
                  {data.tags.map((tag) => (
                    <button type="button" key={tag} aria-label={tag} className="mb-4"></button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
