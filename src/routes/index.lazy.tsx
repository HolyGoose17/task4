import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { useGetProducts } from '../api/useGetProducts';

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { data: products, isLoading } = useGetProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    if (!products) return;
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!products) return;
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  if (isLoading)
    return <div className="h-dvh flex items-center justify-center text-white">Loading...</div>;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black ">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        src="/mainBackground.png"
        alt="bgc"
      />

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="relative w-full max-w-5xl group">
          <div className="relative h-64 overflow-hidden rounded-2xl md:h-125 shadow-2xl">
            {products?.map((prod, index) => (
              <div
                key={prod.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
              >
                <img
                  src={prod.thumbnail}
                  className="absolute block w-full h-full object-contain bg-gray-900/20"
                  alt={prod.title}
                />

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-6 py-2 rounded-full">
                  <p className="text-lg font-medium">
                    {prod.title} — ${prod.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-12 z-30 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-12 z-30 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {products?.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
