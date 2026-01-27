import { createLazyFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { MdClose } from 'react-icons/md';

import { useGetProductById } from '../../api/useGetProductById';

export const Route = createLazyFileRoute('/products/$productId')({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const navigate = useNavigate();
  const { productId } = useParams({ strict: false });
  const id = Number(productId);
  const { data, error, isLoading } = useGetProductById(id);

  if (error) {
    return <div className="mt-10 text-center text-red-600">Error to get product</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-18">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      ) : (
        <div className=" mt-30 mx-auto my-6 w-[70%] px-2">
          <div className="flex flex-col overflow-hidden rounded-2xl border-inherit bg-white shadow-btn md:flex-row">
            <img
              src={data?.thumbnail}
              alt={data?.title}
              className="h-62.5 w-full bg-gray-100 object-contain md:h-auto md:w-100"
            />
            <div className="relative flex-1 p-8">
              <button className="absolute right-4 top-4 rounded-md p-1 cursor-pointer hover:bg-gray-100">
                <MdClose
                  aria-label="Close details"
                  onClick={() => navigate({ to: '/products' })}
                  className="h-6 w-6"
                />
              </button>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">{data?.title}</h1>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">{data?.price}</h2>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.round(data?.rating ?? 0))}
                  {'☆'.repeat(5 - Math.round(data?.rating ?? 0))}
                </div>
                <span className="text-sm text-gray-700">{data?.rating} / 5</span>
              </div>
              <p className="mb-4 text-base text-gray-600">{data?.description}</p>
              {data?.tags && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {data.tags?.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      aria-label={tag}
                      className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="my-4 h-px w-full bg-gray-200" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
