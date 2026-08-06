import LazyLoader, { ChatPage, HomePage } from "@/components/common/lazy"
import ROUTES from "."
import AuthLayout from "@/components/common/auth-layout"


const { HOME, CHAT } = ROUTES;

const appRoutes = [
   {
    element: <AuthLayout />,
    children: [
      {
        element: <LazyLoader />,
        children: [
          {
            path: HOME,
            element: <HomePage />,
          },
          {
            path: CHAT,
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
];

export default appRoutes;