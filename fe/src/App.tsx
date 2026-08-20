import { Toaster } from "@/components/ui/toast"
import AppErrorProvider from "@/providers/error-provider"
import AppRouteProvider from "@/providers/routes-provider"
import QueryProvider from "@/providers/query-provider"

export function App() {
  return (
    <AppErrorProvider>
      <QueryProvider>
      <AppRouteProvider />
      <Toaster />
      </QueryProvider>
    </AppErrorProvider>
  )
}

export default App
