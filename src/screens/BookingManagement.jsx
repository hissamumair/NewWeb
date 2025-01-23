// import { useState, useEffect } from 'react';
// import Navbar from '../components/navbar';
// import {
//   useCreateBookingMutation,
//   useUpdateBookingMutation,
//   useDeleteBookingMutation,
//   useGetAllBookingsQuery,
// } from '../redux/reducers/booking/bookingThunk';

// const BookingManagement = () => {

//   const { data: bookings ,isLoading, isError, error, refetch } = useGetAllBookingsQuery()
//   console.log(bookings)
//      const [createBooking] = useCreateBookingMutation();
//   const [updateBooking] = useUpdateBookingMutation();
//   const [deleteBooking] = useDeleteBookingMutation();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [newBooking, setNewBooking] = useState({
//     id: '',
//     fullName: '',
//     carName: '',
//     startDate: '',
//     status: 'Pending',
//     contactNumber: '',
//   });
//   const [editingBookingId, setEditingBookingId] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       setErrorMessage('Please log in to view your bookings');
//     } else {
//       refetch();
//     }
//   }, [refetch]);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setNewBooking({
//       id: '',
//       fullName: '',
//       carName: '',
//       startDate: '',
//       status: 'Pending',
//       contactNumber: '',
//     });
//     setEditingBookingId(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewBooking((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddOrUpdateBooking = async () => {
//     try {
//       if (!newBooking.fullName || !newBooking.carName || !newBooking.startDate || !newBooking.contactNumber) {
//         setErrorMessage('Please fill in all required fields');
//         return;
//       }

//       if (editingBookingId) {
//         await updateBooking({
//           bookingId: editingBookingId,
//           ...newBooking,
//           userId: localStorage.getItem('userId')
//         }).unwrap();
//       } else {
//         await createBooking({
//           ...newBooking,
//           userId: localStorage.getItem('userId')
//         }).unwrap();
//       }
//       closeModal();
//       setErrorMessage('');

//     } catch (err) {
//       setErrorMessage(err.message || 'Failed to save booking');
//     }
//   };

//   const handleDeleteBooking = async (booking) => {
//     try {
//       console.log("object",booking,localStorage.getItem('userId'))
//       await deleteBooking(booking?._id).unwrap();
//     } catch (err) {
//       setErrorMessage(err.message || 'Failed to delete booking');
//     }
//   };

//   const handleEditBooking = (booking) => {
//     // Convert old field names to new ones if necessary
//     const updatedBooking = {
//       id: booking.id,
//       fullName: booking.fullName || booking.name, // Handle both old and new field names
//       carName: booking.carName || booking.car,
//       startDate: booking.startDate || booking.date,
//       status: booking.status,
//       contactNumber: booking.contactNumber || '',
//     };
//     setNewBooking(updatedBooking);
//     setEditingBookingId(booking.id);
//     setIsModalOpen(true);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 mt-12">
//       <Navbar />

//       {(isError || errorMessage) && (
//         <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">
//                 {errorMessage || error?.data?.message || 'Error loading bookings'}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <h1 className="text-2xl font-semibold text-gray-800">Booking Management</h1>

//       <div className="mt-16">
//         <h2 className="text-xl font-semibold text-gray-700">Booking List</h2>
//         <table className="min-w-full mt-4 table-auto border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Booking ID</th>
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Car Model</th>
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Contact Number</th>
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Booking Date</th>
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
//               <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings?.map((booking) => (
//               <tr key={booking.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b text-sm text-gray-700">{booking._id}</td>
//                 <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.fullName || booking.fullName}</td>
//                 <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.carName || booking.carName}</td>
//                 <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.contactNumber}</td>
//                 <td className="py-2 px-4 border-b text-sm text-gray-700">{booking.startDate || booking.startDate}</td>
//                 <td className="py-2 px-4 border-b text-sm text-gray-700">
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     booking.status === 'Completed'
//                       ? 'bg-green-100 text-green-800'
//                       : booking.status === 'Pending'
//                       ? 'bg-yellow-100 text-yellow-800'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td className="py-2 px-4 border-b text-sm">
//                   <button
//                     className="text-blue-600 hover:text-blue-800 mr-2"
//                     onClick={() => handleEditBooking(booking)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDeleteBooking(booking)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-6">
//         <button
//           className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Add New Booking
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
//           <div className="bg-white p-8 rounded-md w-96 shadow-lg">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               {editingBookingId ? 'Edit Booking' : 'Add New Booking'}
//             </h2>
//             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                   Customer Name*
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   id="fullName"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   value={newBooking.fullName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="carName" className="block text-sm font-medium text-gray-700">
//                   Car Model*
//                 </label>
//                 <input
//                   type="text"
//                   name="carName"
//                   id="carName"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   value={newBooking.carName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
//                   Contact Number*
//                 </label>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   id="contactNumber"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   value={newBooking.contactNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
//                   Booking Date*
//                 </label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   id="startDate"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   value={newBooking.startDate}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   id="status"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   value={newBooking.status}
//                   onChange={handleInputChange}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Canceled">Canceled</option>
//                 </select>
//               </div>
//               <div className="mt-6 flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                   onClick={handleAddOrUpdateBooking}
//                 >
//                   {editingBookingId ? 'Update Booking' : 'Add Booking'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingManagement;

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { X } from "lucide-react";
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} from "../redux/reducers/booking/bookingThunk";

const BookingManagement = () => {
  const {
    data: bookings,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllBookingsQuery();
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newBooking, setNewBooking] = useState({
    id: "",
    fullName: "",
    carName: "",
    startDate: "",
    status: "Pending",
    contactNumber: "",
    paymentScreenshot: "",
  });
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [isViewingPayment, setIsViewingPayment] = useState(false);
  const [selectedPaymentImage, setSelectedPaymentImage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // setErrorMessage('Please log in to view your bookings');
    } else {
      refetch();
    }
  }, [refetch]);

  const resetBookingForm = () => {
    setNewBooking({
      id: "",
      fullName: "",
      carName: "",
      startDate: "",
      status: "Completed",
      contactNumber: "",
      paymentScreenshot: "",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetBookingForm();
    setEditingBookingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("object", e.target.name);
    setNewBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBooking((prev) => ({
          ...prev,
          paymentScreenshot: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateBooking = async () => {
    try {
      if (
        !newBooking.fullName ||
        !newBooking.carName ||
        !newBooking.startDate ||
        !newBooking.contactNumber
      ) {
        setErrorMessage("Please fill in all required fields");
        return;
      }

      const bookingData = {
        fullName: newBooking.fullName,
        email: newBooking.email,
        carName: newBooking.carName,
        startDate: newBooking.startDate,
        status: newBooking.status,
        contactNumber: newBooking.contactNumber,
        paymentScreenshot: newBooking.paymentScreenshot,
        userId: localStorage.getItem("userId"),
      };

      if (editingBookingId) {
        console.log("editingBookingId", newBooking);
        await updateBooking({
          id: editingBookingId,
          ...bookingData,
        }).unwrap();
      } else {
        await createBooking(bookingData).unwrap();
      }

      await refetch();
      closeModal();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message || "Failed to save booking");
    }
  };

  const handleDeleteBooking = async (booking) => {
    try {
      await deleteBooking(booking?._id).unwrap();
      await refetch();
    } catch (err) {
      setErrorMessage(err.message || "Failed to delete booking");
    }
  };

  const handleEditBooking = (booking) => {
    const updatedBooking = {
      id: booking._id,
      fullName: booking.fullName || "",
      email: booking.email || "",
      carName: booking.carName || "",
      startDate: booking.startDate || "",
      status: booking.status || "Pending",
      contactNumber: booking.contactNumber || "",
      paymentScreenshot: booking.paymentScreenshot || "",
    };
    setNewBooking(updatedBooking);
    setEditingBookingId(booking._id);
    setIsModalOpen(true);
  };

  const handleAddNewBooking = () => {
    resetBookingForm();
    setIsModalOpen(true);
  };

  const handleViewPayment = (paymentScreenshot) => {
    setSelectedPaymentImage(paymentScreenshot);
    setIsViewingPayment(true);
  };

  const closePaymentModal = () => {
    setIsViewingPayment(false);
    setSelectedPaymentImage("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-12">
      <Navbar />

      {(isError || errorMessage) && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {errorMessage ||
                  error?.data?.message ||
                  "Error loading bookings"}
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-semibold text-gray-800">
        Booking Management
      </h1>

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
                Contact Number
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Booking Date
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Payment
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking._id}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.fullName}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.carName}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.contactNumber}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.startDate}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {booking.paymentScreenshot ? (
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() =>
                        handleViewPayment(booking.paymentScreenshot)
                      }
                    >
                      View Payment
                    </button>
                  ) : (
                    <span className="text-gray-500">No payment uploaded</span>
                  )}
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
                    onClick={() => handleDeleteBooking(booking)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleAddNewBooking}
        >
          Add New Booking
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-96 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                {editingBookingId ? "Edit Booking" : "Add New Booking"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="carName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Model*
                </label>
                <input
                  type="text"
                  name="carName"
                  id="carName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.carName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number*
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Booking Date*
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.startDate}
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
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={handleAddOrUpdateBooking}
                >
                  {editingBookingId ? "Update Booking" : "Add Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewingPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md max-w-2xl shadow-lg relative">
            <button
              onClick={closePaymentModal}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close payment view"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            <div className="mt-6">
              <img
                src={selectedPaymentImage}
                alt="Payment Screenshot"
                className="max-w-full h-96 rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
