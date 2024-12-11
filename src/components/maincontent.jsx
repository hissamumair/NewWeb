
const MainContent = () => {
  return (
    <main className="flex-1 bg-white rounded-lg shadow-xl p-8 overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-green-600">
          Your ad is successfully published
        </h2>
        <p className="text-gray-600 mt-2">
          Proin placerat risus non justo faucibus commodo. Nunc non neque sit amet magna aliquam condimentum.
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-300 transition duration-300">
          Go Back
        </button>
        <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300">
          View Ads →
        </button>
      </div>
    </main>
  );
};

export default MainContent;
