import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllCarBookingsForUserQuery, useCreateCarBookingMutation } from './../redux/reducers/carbooking /carbookingThunk'; // Adjust the path
import Navbar from '../components/navbar';

const CarBooking = () => {
  const { data, error, isLoading } = useGetAllCarBookingsForUserQuery('userId'); // Replace 'userId' with actual user id
  const [createCarBooking, { isLoading: isCreating, error: createError }] = useCreateCarBookingMutation();
  
  // This effect will log the fetched data or errors
  useEffect(() => {
    if (error) {
      console.error('Error fetching car bookings:', error);
    }
  }, [error]);

  const handleAddNewBooking = async () => {
    const newBookingData = {
      customerName: 'John Doe',
      carModel: 'Tesla Model S',
      bookingDate: '2024-12-25',
      status: 'Pending',
    };

    try {
      await createCarBooking(newBookingData).unwrap();
      // Handle success (e.g., show success message or refetch bookings)
    } catch (err) {
      console.error('Error creating booking:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            {data?.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.id}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.customerName}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.carModel}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.bookingDate}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.status}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button> | 
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Car Booking Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleAddNewBooking}
          disabled={isCreating}
        >
          {isCreating ? 'Adding...' : 'Add New Car Booking'}
        </button>
      </div>

      {createError && <div className="text-red-600 mt-4">Error creating booking: {createError.message}</div>}
    </div>
  );
};

export default CarBooking;
