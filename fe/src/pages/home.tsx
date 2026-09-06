import Login from "@/components/login"
import Register from "@/components/register"
import { useSearchParams } from "react-router-dom"

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const login = searchParams.get("auth_type") === "login";

  return (
    <div>
      {login ? <Login /> : <Register />}
    </div>
  )
}

export default HomePage