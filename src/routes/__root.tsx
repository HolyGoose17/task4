import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { MdOutlineStore } from 'react-icons/md';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const [open, setOpen] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <header className="bg-blue flex justify-between items-center h-16 px-12 shadow-head">
        <div className="flex justify-evenly gap-9">
          <button className="cursor-pointer" onClick={handleDrawerOpen}>
            <Link to="/products">
              <CgDetailsMore className=" w-6 h-6" />
            </Link>
          </button>

          <Link to="/">
            <MdOutlineStore className="w-6 h-6 text-gray-600  hover:bg-gray-100 hover:rounded-1/2" />
          </Link>
        </div>
        <div className="flex justify-evenly gap-4.5">
          {auth ? (
            <div className="flex justify-center items-center gap-3">
              <div>userName</div>
              <button
                onClick={() => console.log('Выход')}
                className="py-1.25 px-3.75 bg-secondary rounded-sm border-inherit  shadow-btn active:bg-gray-400"
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <>
              <Link to="/authorize" className="text-sm font-medium tracking-tight">
                <button className="py-1.25 px-3.75 border rounded-sm border-black active:bg-gray-400">
                  LOG IN
                </button>
              </Link>
              <Link to="/registration" className="text-sm font-medium tracking-tight ">
                <button className="py-1.25 px-3.75 bg-secondary rounded-sm border-inherit  shadow-btn active:bg-gray-400">
                  SIGN UP
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
