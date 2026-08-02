import { type ReactNode } from "react"
import AppLayout from "./components/common/app-layout"

export function App({ children }: { children: ReactNode }) {
  return (
    <AppLayout>{children}</AppLayout>
  )
}

export default App
