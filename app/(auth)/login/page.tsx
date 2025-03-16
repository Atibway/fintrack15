import LoginForm from "@/components/auth/LoginForm"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const isLoggedIn = await currentUser()
  if (isLoggedIn) {
    redirect("/")
  } else {
    return <LoginForm />
  }
}

export default LoginPage

