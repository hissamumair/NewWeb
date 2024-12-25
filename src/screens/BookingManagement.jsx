import { useState } from 'react';
import Navbar from '../components/navbar';
import {
  useGetAllBookingsForUserQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} from './../redux/reducers/booking/bookingReducer';

const BookingManagement = () => {
  // RTK Query hooks
  const { data: bookings = [], isLoading, isError } = useGetAllBookingsForUserQuery();
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  // State to manage modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    id: '',
    name: '',
    car: '',
    date: '',
    status: '',
  });
  const [editingBookingId, setEditingBookingId] = useState(null);

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setNewBooking({ id: '', name: '', car: '', date: '', status: '' });
    setEditingBookingId(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit to add or update booking
  const handleAddOrUpdateBooking = async () => {
    try {
      if (editingBookingId) {
        await updateBooking({ 
          bookingId: editingBookingId, 
          ...newBooking 
        }).unwrap();
      } else {
        await createBooking(newBooking).unwrap();
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save booking:', error);
      // Handle error (show notification, etc.)
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id).unwrap();
    } catch (error) {
      console.error('Failed to delete booking:', error);
      // Handle error (show notification, etc.)
    }
  };

  // Handle edit booking
  const handleEditBooking = (booking) => {
    setNewBooking(booking);
    setEditingBookingId(booking.id);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-6 mt-12">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 mt-12">Error loading bookings</div>;
  }

  return (
    <div className="p-6 mt-12">
      <Navbar />
      <h1 className="text-2xl font-semibold text-gray-800">Booking Management</h1>
      <p className="mt-4 text-gray-600">
        Manage all bookings here, including adding, editing, or deleting bookings.
      </p>

      <div className="mt-16">
        <h2 className="text-xl font-semibold text-gray-700">Booking List</h2>
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Booking ID
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Customer Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Car Model
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Booking Date
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.id}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.name}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.car}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.date}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    onClick={() => handleEditBooking(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Booking Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Booking
        </button>
      </div>

      {/* Modal for Adding or Editing Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-96 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {editingBookingId ? 'Edit Booking' : 'Add New Booking'}
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Booking ID
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.id}
                  onChange={handleInputChange}
                  disabled={editingBookingId}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="car"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Model
                </label>
                <input
                  type="text"
                  name="car"
                  id="car"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.car}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Booking Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={handleAddOrUpdateBooking}
                >
                  {editingBookingId ? 'Update Booking' : 'Add Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;