import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Grammar } from "@/pages/Grammar";
import { Home } from "@/pages/Home";
import { Lessons } from "@/pages/Lessons";
import { Practice } from "@/pages/Practice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const lessonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lessons",
  component: Lessons,
});
const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/practice",
  component: Practice,
});
const grammarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/grammar",
  component: Grammar,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  lessonsRoute,
  practiceRoute,
  grammarRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
