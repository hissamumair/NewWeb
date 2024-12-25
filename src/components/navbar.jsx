const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10  shadow-mg bg-green-600">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-black-600 hover:text-white">
            Expedition Management System
          </h1>
        </div>
      
        <div className="flex items-center space-x-4">
          <img
            src="src/assets/profile.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-green-500"
          />
          <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
            + Post a Job
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
