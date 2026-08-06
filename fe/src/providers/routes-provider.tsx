import appRoutes from "@/routes/app-routes"
import { RouterProvider, createBrowserRouter } from "react-router-dom"


export default function AppRoutePovider(){
  return (
    <RouterProvider router={createBrowserRouter(appRoutes)} />
  )
}
