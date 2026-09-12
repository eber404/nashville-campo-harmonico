import { createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router';
import { HarmonicPage } from './App';

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#03060a] p-6 text-center text-white">
      <div>
        <h1 className="text-3xl font-black">Página não encontrada</h1>
        <Link className="mt-4 inline-block text-cyanbrand underline" to="/">Voltar para o campo maior</Link>
      </div>
    </main>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFound,
});

const majorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <HarmonicPage mode="major" />,
});

const minorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/menor',
  component: () => <HarmonicPage mode="minor" />,
});

const routeTree = rootRoute.addChildren([majorRoute, minorRoute]);

const basepath = import.meta.env.BASE_URL === '/'
  ? '/'
  : import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createRouter({ routeTree, basepath: basepath });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
