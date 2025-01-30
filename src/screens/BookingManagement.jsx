import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { X, Upload } from "lucide-react";
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
    email: "",
    paymentScreenshot: "",
  });
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [isViewingPayment, setIsViewingPayment] = useState(false);
  const [selectedPaymentImage, setSelectedPaymentImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // setErrorMessage("Please log in to view your bookings");
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
      status: "Pending",
      contactNumber: "",
      email: "",
      paymentScreenshot: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetBookingForm();
    setEditingBookingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrorMessage("File size should not exceed 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "payment_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dduptdo0c/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Upload Error:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleAddOrUpdateBooking = async () => {
    try {
      setIsUploading(true);
      let paymentScreenshotUrl = newBooking.paymentScreenshot;

      if (imageFile) {
        paymentScreenshotUrl = await uploadImageToCloudinary(imageFile);
      }

      const bookingData = {
        fullName: newBooking.fullName,
        email: newBooking.email,
        carName: newBooking.carName,
        startDate: newBooking.startDate,
        status: newBooking.status,
        contactNumber: newBooking.contactNumber,
        paymentScreenshot: paymentScreenshotUrl,
        userId: localStorage.getItem("userId"),
      };

      if (editingBookingId) {
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
    } finally {
      setIsUploading(false);
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
    if (booking.paymentScreenshot) {
      setImagePreview(booking.paymentScreenshot);
    }
    setIsModalOpen(true);
  };

  const handleDeleteBooking = async (booking) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(booking?._id).unwrap();
        await refetch();
      } catch (err) {
        setErrorMessage(err.message || "Failed to delete booking");
      }
    }
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
                {errorMessage || error?.data?.message || "Error loading bookings"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Booking Management
        </h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => {
            resetBookingForm();
            setIsModalOpen(true);
          }}
        >
          Add New Booking
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings?.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.fullName}</div>
                  <div className="text-sm text-gray-500">{booking.email}</div>
                  <div className="text-sm text-gray-500">{booking.contactNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.carName}</div>
                  {/* <div className="text-sm text-gray-500">{booking.startDate}</div> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.paymentScreenshot ? (
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleViewPayment(booking.paymentScreenshot)}
                    >
                      View Payment
                    </button>
                  ) : (
                    "No payment"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => handleEditBooking(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
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

      {/* Add/Edit Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingBookingId ? "Edit Booking" : "Add New Booking"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="carName" className="block text-sm font-medium text-gray-700">
                  Car Model
                </label>
                <input
                  type="text"
                  name="carName"
                  id="carName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.carName}
                  onChange={handleInputChange}
                />
              </div>

          

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.startDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={newBooking.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Screenshot
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-auto object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setNewBooking(prev => ({
                              ...prev,
                              paymentScreenshot: ""
                            }));
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleAddOrUpdateBooking}
                  disabled={isUploading}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingBookingId ? "Updating..." : "Creating..."}
                    </span>
                  ) : (
                    editingBookingId ? "Update Booking" : "Create Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Preview Modal */}
      {isViewingPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Payment Screenshot</h3>
              <button
                onClick={closePaymentModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative w-full h-96">
              <img
                src={selectedPaymentImage}
                alt="Payment Screenshot"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;