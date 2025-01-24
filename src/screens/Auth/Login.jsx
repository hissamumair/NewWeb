import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/reducers/user/userThunk";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Handle form submission
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser({
        email: values.username,
        password: values.password,
      }).unwrap(); // Assuming `loginUser` returns a promise with the user details
  
      if (response?.user?.role === "admin") {
        // Store credentials and other necessary details in localStorage
        localStorage.setItem("credentials", JSON.stringify(values));
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("isLoggedIn", "okay");
    
        // Log for debugging
        console.log("Navigating to dashboard");
        window.location.reload();
        navigate("/dashboard");
      } else {
        // Show a message if the user is not an admin
        alert("You must be an admin to log in.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your username and password.");
    } finally {
      setSubmitting(false);
    }
  };
  
 

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="p-12 rounded-lg shadow-lg w-[600px] h-[600px] bg-white">
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
                disabled={isLoading}
                className="w-full p-4 bg-blue-600 text-white rounded-md 
                  hover:bg-blue-700 focus:outline-none focus:ring-4 
                  focus:ring-blue-300 transition-all 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useLoginUserMutation } from "../../redux/reducers/user/userThunk"; // Import the login API hook

// // Validation schema
// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const [loginUser] = useLoginUserMutation(); // Hook for the login API

//   // Handle form submission
//   const handleLogin = async (values, { setSubmitting, setFieldError }) => {
//     try {
//       // Send login request
//       const response = await loginUser({
//         email: values.email,
//         password: values.password,
//       }).unwrap();

//       // Handle success: Store token and navigate to dashboard
//       localStorage.setItem("token", response.token);
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/dashboard");
//     } catch (error) {
//       // Handle errors: Display API errors
//       if (error.data?.message) {
//         setFieldError("email", error.data.message);
//       } else {
//         setFieldError("email", "An unexpected error occurred.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleSignUp = () => {
//     navigate("/SignUp"); // Navigate to the Sign-Up page
//   };

//   return (
//     <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-green-400 to-blue-500">
//       <div className="p-12 rounded-lg shadow-lg w-[600px] h-[600px] bg-white">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
//           Welcome Back
//         </h2>

//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={LoginSchema}
//           onSubmit={handleLogin}
//         >
//           {({ isSubmitting, errors, touched }) => (
//             <Form>
//               {/* Email Field */}
//               <div className="mb-6">
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   className={`w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
//                     errors.email && touched.email
//                       ? "border-red-500 focus:ring-red-300"
//                       : "border-gray-300 focus:ring-blue-400"
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm mt-2"
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="mb-8">
//                 <Field
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   className={`w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
//                     errors.password && touched.password
//                       ? "border-red-500 focus:ring-red-300"
//                       : "border-gray-300 focus:ring-blue-400"
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm mt-2"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? "Logging In..." : "Log In"}
//               </button>
//             </Form>
//           )}
//         </Formik>

//         {/* Sign Up Redirect */}
//         <div className="mt-4 text-center">
//           <p className="text-gray-700">
//             Don't have an account?{" "}
//             <button
//               onClick={handleSignUp}
//               className="text-blue-600 font-semibold hover:underline"
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
