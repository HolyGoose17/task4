import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <form className="p-2 flex flex-col items-center">
      <input
        type="text"
        placeholder="Find Products"
        className="left-1/2 mt-12 w-3/4 h-14 px-3.5 py-4 border rounded-sm border-gray-400 focus:border-blue-400 focus:outline-none focus:border-2 hover:border-black "
      />
    </form>
  );
}
