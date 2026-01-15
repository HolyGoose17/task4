import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { router } from './app/router';

const queryClient = new QueryClient();

// const homeRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/',
//   component: () => <ForwardPage />,
// });

// const productsRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/products',
//   component: () => <ProductCards />,
// });

// const detailsRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/products/1',
//   component: () => <ProductDetails />,
// });

// const authRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/authorize',
//   component: () => <Authorization />,
// });

// const registerRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/registration',
//   component: () => <Registration />,
// });

// const routeTree = rootRoute.addChildren([
//   homeRoute,
//   productsRoute,
//   detailsRoute,
//   authRoute,
//   registerRoute,
// ]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
