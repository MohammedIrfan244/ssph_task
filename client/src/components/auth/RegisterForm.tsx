import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosErrorManager from "../../lib/utils/axiosError";
import { useState } from "react";
import { FaEye ,FaEyeSlash } from "react-icons/fa";

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
      alert(response.data.message);
      resetForm();
    } catch (err) {
      setServerError(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <Field type="text" name="username" placeholder="Username" className="input w-full" />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field type="email" name="email" placeholder="Email" className="input w-full" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="relative">
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="relative">
            <Field
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </Form>
      </Formik>

      <p className="text-center text-sm">Already have an account? <a href="/auth/login" className="text-blue-500">Login</a></p>
      {serverError && <p className="text-red-500 text-center">{serverError}</p>}
    </div>
  );
};

export default RegisterForm;
