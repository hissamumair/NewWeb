// UserManagement.js
import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useAddUserMutation,
  // useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from './../redux/reducers/user/userThunk';

const UserManagement = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [addUser] = useAddUserMutation();
  // const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({ name: '', role: 'user' });

  const handleRoleChange = async (updatedUser, newRole) => {
    try {
      const user = {_id:updatedUser._id,role:newRole}
      await updateUser(user).unwrap();
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
  };

  const handleAddUser = async () => {
    if (newUser.name.trim() !== '') {
      try {
        const userTobeAdd = {name:newUser.name, email:newUser.email, password:"123456",contactNo:"02394832094839"}
        await addUser(userTobeAdd).unwrap();
        setNewUser({ name: '', role: 'User' }); // Reset form
      } catch (err) {
        console.error('Failed to add user:', err);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 mt-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-12">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-12">
      <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
      <p className="mt-4 text-gray-600">
        This is where you can manage users and their permissions.
      </p>

      <div className="mt-6">
        {/* Add User Form */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Enter user name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded-md w-64"
          />
               <input
            type="text"
            placeholder="Enter user email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded-md w-64"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>

        {/* User Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Email</th>
              <th className="py-2 px-4 text-left text-gray-600">Role</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user,index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-gray-700">{user.name}</td>
                <td className="py-2 px-4 text-gray-700">{user.email}</td>
                <td className="py-2 px-4 text-gray-700">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="border p-1 rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

