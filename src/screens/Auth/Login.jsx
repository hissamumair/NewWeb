import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true); // Set the authenticated state
    navigate('/dashboard');   // Navigate to the Dashboard
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Login form container with gradient background */}
      <div className="p-12 rounded-lg shadow-lg w-[600px] h-[450px] bg-white">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-8 relative">
            <input
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type={isPasswordVisible ? 'text' : 'password'} // Conditionally set type based on visibility
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <span 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible className="text-gray-600" size={24} />
              ) : (
                <AiOutlineEye className="text-gray-600" size={24} />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
