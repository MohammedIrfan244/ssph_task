import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosErrorManager from "../../lib/utils/axiosError";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const initialValues: FormValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().min(3, "Too short").max(10, "Too long").required("Username is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(6, "Min 6 characters")
            .max(10, "Max 10 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm your password"),
    });

    const handleSubmit = async (
        values: FormValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        setServerError("");
        setLoading(true);
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/auth/register",
                values
            );
            toast.success(response.data.message || "User registered")
            resetForm();
            navigate("/auth/login");
        } catch (err) {
            setServerError(axiosErrorManager(err));
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
                        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-400 text-xs font-semibold">Join us today and get started</p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="space-y-5">

                            <div className="space-y-1">

                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    className="w-full px-5 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                            </div>


                            <div className="space-y-1">

                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-5 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>


                            <div className="space-y-1">

                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-5 py-1 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="space-y-1">

                                <div className="relative">
                                    <Field
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="w-full px-5 py-1 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500 transition-colors"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                                    </button>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-400 to-green-500 rounded-md text-white py-1 px-5 rou1ded-lg font-semibold text-md hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </Form>
                    </Formik>

                    {serverError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-1 rounded-lg text-sm text-center">
                            {serverError}
                        </div>
                    )}

                    <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{" "}
                            <a
                                href="/auth/login"
                                className="text-green-500 hover:text-green-600 font-semibold transition-colors hover:underline"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;