import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (values, { setSubmitting }) => {
    const credentials = {
      username: values.username,
      password: values.password,
    };

    // Store credentials in localStorage
    localStorage.setItem("credentials", JSON.stringify(credentials));
    localStorage.setItem("isLoggedIn", "okay");

    // Log for debugging
    console.log("Navigating to dashboard");
    window.location.reload();
    navigate("/dashboard");
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="p-12 rounded-lg shadow-lg w-[600px] h-[550px] bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-6">
                <Field
                  name="username"
                  className={`w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                    ${
                      errors.username && touched.username
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                  type="text"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mb-8">
                <Field
                  name="password"
                  className={`w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                    ${
                      errors.password && touched.password
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-4 bg-blue-600 text-white rounded-md 
                  hover:bg-blue-700 focus:outline-none focus:ring-4 
                  focus:ring-blue-300 transition-all 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
