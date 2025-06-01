import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
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
  const dispatch = useDispatch();

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
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (err) {
      setError(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-5 space-y-3">
          
          <div className="text-center space-y-1">
            <div className="mx-auto flex items-center justify-center mb-2">
              <FaUserCircle className="text-2xl md:text-4xl lg:text-6xl text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-400 text-xs font-semibold">Sign in to your account</p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-5">
            
            <div className="space-y-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-5 py-1 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-500 rounded-md text-white py-1 px-5 font-semibold text-md hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-1 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="text-green-500 hover:text-green-600 font-semibold transition-colors hover:underline"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;