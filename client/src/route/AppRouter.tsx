import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/user/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import Notfound from "../pages/Notfound"
function AppRouter() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/auth/login" replace />
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
