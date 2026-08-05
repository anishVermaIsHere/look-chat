import { Suspense } from "react"

const LazyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>LazyPage</Suspense>
  )
}

export default LazyPage