import  { useState } from "react";
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosErrorManager from "../../lib/utils/axiosError";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
        setError("Email and password are required");
        return;
        }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", {
        email,password
      });

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));
        navigate("/");
    } catch (err) {
      setError(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Login</h2>
<form onSubmit={(e)=>handleLogin(e)} >
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash  size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
</form>
      <p className="text-center text-sm">
        Don't have an account? <a href="/auth/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
};

export default LoginForm;
