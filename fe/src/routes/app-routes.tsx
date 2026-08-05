import { Suspense }  from "react"

const appRoutes = [
  {
    element: <ProtectedPage element={<AppLayout />}/>,
    children: [
      {
        path: HOME,
        element: (
          <Suspense fallback={<Spinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: LOGIN,
        element: (
          <Suspense fallback={<Spinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
    }
];

export default appRoutes;