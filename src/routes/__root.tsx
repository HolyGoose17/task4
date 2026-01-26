import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { Suspense, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { FaChevronLeft } from 'react-icons/fa';
import { MdOutlineStore } from 'react-icons/md';

import { AuthorizeSwitchDesign } from '../components/layout/AuthorizeSwitch';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-blue flex justify-between items-center h-16 px-12 shadow-head">
        <div className="flex justify-evenly gap-9">
          <button
            className="cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-shadow hover:rounded-1/2 border-inherit hover:rounded-full"
            onClick={() => setDrawerOpen(true)}
          >
            <CgDetailsMore className=" w-6 h-6" />
          </button>

          <button
            className="w-10 h-10 flex justify-center items-center border-inherit cursor-pointer hover:bg-shadow hover:rounded-1/2 hover:rounded-full"
            onClick={() => navigate({ to: '/' })}
          >
            <MdOutlineStore className="w-6 h-6 text-gray-600  " />
          </button>
        </div>

        <div className="flex justify-evenly items-center gap-4.5">
          <AuthorizeSwitchDesign />
        </div>
      </header>

      {drawerOpen && (
        <>
          <aside
            className={`fixed top-0 left-0 z-50 h-full w-45 bg-white shadow
                transform transition-transform duration-300
                ${drawerOpen ? 'translate-x-0.5' : '-translate-x-full'}
              `}
          >
            <button
              className="flex h-16 items-center justify-start px-4 cursor-pointer hover:bg-shadow"
              onClick={() => setDrawerOpen(false)}
            >
              <FaChevronLeft />
            </button>

            <button
              className="block mt-1 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setDrawerOpen(false);
                navigate({ to: '/products' });
              }}
            >
              Products
            </button>
          </aside>
        </>
      )}

      <main>
        <Suspense
          fallback={
            <div className="mt-10 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
