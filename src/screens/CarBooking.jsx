import Navbar from '../components/navbar';

const CarBooking = () => {
  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-semibold text-gray-800">Car Booking Management</h1>
      <p className="mt-4 text-gray-600">Manage all car bookings here, including adding, editing, or deleting bookings.</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Car Booking List</h2>
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Booking ID</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Car Model</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Booking Date</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-sm text-gray-700">CBK12345</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">Alice Johnson</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">Ford Mustang</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">12/10/2024</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">Confirmed</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">
                <button className="text-blue-600 hover:text-blue-800">Edit</button> | 
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-sm text-gray-700">CBK12346</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">Bob Lee</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">BMW 5 Series</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">12/15/2024</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">Pending</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">
                <button className="text-blue-600 hover:text-blue-800">Edit</button> | 
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            {/* More rows can be added here */}
          </tbody>
        </table>
      </div>

      {/* Add New Car Booking Button */}
      <div className="mt-6">
        <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Add New Car Booking
        </button>
      </div>
    </div>
  );
};

export default CarBooking;
