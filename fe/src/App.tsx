import { Toaster } from "@/components/ui/toast"
import AppErrorProvider from "@/providers/error-provider"
import AppRouteProvider from "@/providers/routes-provider"


export function App() {
  return (
    <AppErrorProvider>
      <AppRouteProvider />
      <Toaster />
    </AppErrorProvider>
  )
}

export default App
