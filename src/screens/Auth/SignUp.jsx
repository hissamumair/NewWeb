// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // For React Router v6+

// const SignOut = () => {
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     setIsLoggingOut(true);

//     // Here you can clear any auth tokens or local storage entries
//     localStorage.removeItem("authToken"); // Example: Remove auth token from localStorage
    
//     // Redirect user to the login page
//     navigate("/login"); // Redirect to the '/login' route

//     setIsLoggingOut(false); // Reset logging out state
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign Out</h1>
//       <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
//       <button
//         onClick={handleSignOut}
//         className="w-full px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//       >
//         {isLoggingOut ? "Logging out..." : "Sign Out"}
//       </button>
//     </div>
//   );
// };

// export default SignOut;



import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function SignUp({ navigation }) {
  const handleSignUp = (values) => {
    // You can send the values to your API or save them as needed
    console.log("Sign Up Successful:", values);

    // Navigate to Login Screen after Sign Up
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Username Field */}
            <TextInput
              style={[styles.input, touched.username && errors.username ? styles.errorInput : null]}
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            {/* Email Field */}
            <TextInput
              style={[styles.input, touched.email && errors.email ? styles.errorInput : null]}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Field */}
            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.errorInput : null]}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* Navigate to Login */}
      <View style={styles.loginRedirect}>
        <Text style={styles.redirectText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  redirectText: {
    color: "#555",
  },
  linkText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
