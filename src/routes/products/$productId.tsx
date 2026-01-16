import { createFileRoute, useParams } from '@tanstack/react-router';
import { MdClose } from 'react-icons/md';

import { useGetProductById } from '../../api/useGetProductById';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const id = useParams({
    from: '/products/$productId',
    select: (params) => Number(params.productId),
  });
  const { data, error, isLoading } = useGetProductById(id);

  if (error) {
    return <div>Ошибка получения данных</div>;
  }

  return (
    <div className="mt-9/100">
      {isLoading ? (
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
                onClick={() => console.log('Watching all products')}
                className="absolute top-32 right-32"
              />
              <h4>{data?.title}</h4>
              <h5>{data?.price}</h5>
              <div>
                <img src={data?.thumbnail} alt={data?.title} />
                <h5>{data?.rating} / 5</h5>
              </div>
              <p>{data?.description}</p>
              {data?.tags && (
                <div>
                  {data.tags?.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      aria-label={tag}
                      className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-black"
                    >
                      {tag}
                    </span>
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
