import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "../pages/user/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
