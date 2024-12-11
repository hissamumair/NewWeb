import  { useState } from 'react';
import Navbar from '../components/navbar';

const AccountSetting = () => {
  const [userData, setUserData] = useState({
    username: 'JohnDoe123',
    email: 'johndoe@example.com',
    fullName: 'John Doe',
    phoneNumber: '+1234567890',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    // Here you can call an API or perform an action to save changes
    console.log('Changes saved');
  };

  const handlePasswordUpdate = () => {
    // Here you can call an API or perform an action to update password
    if (passwordData.newPassword === passwordData.confirmPassword) {
      console.log('Password updated');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="p-16 mt-10">
      <Navbar />
      <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
        <form>
          <div className="mt-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-5 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700">Change Password</h2>
        <form>
          <div className="mt-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your current password"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your new password"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Confirm your new password"
            />
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handlePasswordUpdate}
              className="px-5 py-1 bg-green-500 text-sm text-white rounded-md hover:bg-green-600"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
