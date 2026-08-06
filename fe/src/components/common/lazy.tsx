import { lazy, Suspense, type ReactNode } from "react";
import Spinner from "@/widgets/spinner";
import { Outlet } from "react-router-dom";

const LazyLoader = ({ children }: { children?: ReactNode }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
};


const HomePage = lazy(() => import("@/pages/home"));
const ChatPage = lazy(() => import("@/pages/chat"));



export {
  HomePage,
  ChatPage
}

export default LazyLoader;