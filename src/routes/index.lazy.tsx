import { createLazyFileRoute } from '@tanstack/react-router';

import { useGetProducts } from '../api/useGetProducts';

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isLoading } = useGetProducts();

  return (
    <section className="">
      <img
        className="absolute w-dvw h-dvh  object-cover opacity-40"
        src="/mainBackground.png"
        alt="bgc"
      />
      {isLoading ? (
        <div>Carousel</div>
      ) : (
        data?.map((prod) => (
          <div className="" key={prod.id}>
            <img className="fill-inherit" src={prod.thumbnail} alt={prod.title} />
          </div>
        ))
      )}
    </section>
  );
}
