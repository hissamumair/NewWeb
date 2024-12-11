import { useState } from 'react';
import Navbar from '../components/navbar';

const BookingManagement = () => {
  // State to manage bookings
  const [bookings, setBookings] = useState([
    { id: 'BKG12345', name: 'John Doe', car: 'Toyota Corolla', date: '12/10/2024', status: 'Confirmed' },
    { id: 'BKG12346', name: 'Jane Smith', car: 'Honda Civic', date: '12/15/2024', status: 'Pending' },
  ]);

  // State to manage modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    id: '',
    name: '',
    car: '',
    date: '',
    status: '',
  });
  const [editingBookingId, setEditingBookingId] = useState(null); // Track if we're editing a booking

  // Handle modal close
  const closeModal = () => setIsModalOpen(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit to add or update booking
  const handleAddOrUpdateBooking = () => {
    if (editingBookingId) {
      // Update booking
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === editingBookingId ? { ...newBooking } : booking
        )
      );
    } else {
      // Add new booking
      setBookings((prevBookings) => [...prevBookings, newBooking]);
    }
    setNewBooking({ id: '', name: '', car: '', date: '', status: '' }); // Clear form
    setEditingBookingId(null); // Clear editing state
    closeModal(); // Close modal after adding or updating
  };

  // Handle delete booking
  const handleDeleteBooking = (id) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  };

  // Handle edit booking
  const handleEditBooking = (booking) => {
    setNewBooking(booking); // Pre-fill form with booking details
    setEditingBookingId(booking.id); // Set editing state
    setIsModalOpen(true); // Open modal for editing
  };

  return (
    <div className="p-6 mt-12">
      <Navbar />
      <h1 className="text-2xl font-semibold text-gray-800">Booking Management</h1>
      <p className="mt-4 text-gray-600">Manage all bookings here, including adding, editing, or deleting bookings.</p>

      <div className="mt-16">
        <h2 className="text-xl font-semibold text-gray-700">Booking List</h2>
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
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.id}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.name}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.car}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.date}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.status}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEditBooking(booking)}
                  >
                    Edit
                  </button> 
                  | 
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
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Booking
        </button>
      </div>

      {/* Modal for Adding or Editing Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-96">
            <h2 className="text-xl font-semibold text-gray-700">{editingBookingId ? 'Edit Booking' : 'Add New Booking'}</h2>
            <form className="mt-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">Booking ID</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newBooking.id}
                  onChange={handleInputChange}
                  disabled={editingBookingId} // Disable if editing
                />
              </div>
              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newBooking.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="car" className="block text-sm font-medium text-gray-700">Car Model</label>
                <input
                  type="text"
                  name="car"
                  id="car"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newBooking.car}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Booking Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newBooking.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newBooking.status}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
