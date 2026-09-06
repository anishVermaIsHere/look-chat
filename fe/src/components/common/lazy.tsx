import { lazy, Suspense } from "react";
import Spinner from "@/widgets/spinner";
import { Outlet } from "react-router-dom";

const LazyLoader = () => {
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