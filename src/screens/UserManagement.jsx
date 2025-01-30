import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from './../redux/reducers/user/userThunk';
import { Loader2 } from 'lucide-react';

const UserManagement = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });

  const handleRoleChange = async (updatedUser, newRole) => {
    try {
      setUpdatingUserId(updatedUser._id);
      const user = { _id: updatedUser._id, role: newRole };
      await updateUser(user).unwrap();
    } catch (err) {
      console.error('Failed to update user role:', err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleAddUser = async () => {
    if (newUser.name.trim() !== '' && newUser.email.trim() !== '') {
      try {
        const userTobeAdd = {
          name: newUser.name,
          email: newUser.email,
          password: "123456",
          contactNo: "02394832094839"
        };
        await addUser(userTobeAdd).unwrap();
        setNewUser({ name: '', email: '', role: 'user' });
      } catch (err) {
        console.error('Failed to add user:', err);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setDeletingUserId(id);
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error('Failed to delete user:', err);
    } finally {
      setDeletingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 mt-12 flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-12">
        <div className="text-red-500 bg-red-50 p-4 rounded-md">
          Error: {error.message}
        </div>
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
            disabled={isAddingUser}
          />
          <input
            type="text"
            placeholder="Enter user email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded-md w-64"
            disabled={isAddingUser}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded-md"
            disabled={isAddingUser}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button
            onClick={handleAddUser}
            disabled={isAddingUser}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
          >
            {isAddingUser && <Loader2 className="h-4 w-4 animate-spin" />}
            {isAddingUser ? 'Adding...' : 'Add User'}
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
            {data?.users?.map((user, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-gray-700">{user.name}</td>
                <td className="py-2 px-4 text-gray-700">{user.email}</td>
                <td className="py-2 px-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="border p-1 rounded-md"
                      disabled={updatingUserId === user._id}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    {updatingUserId === user._id && (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={deletingUserId === user._id}
                    className="text-red-500 hover:text-red-700 disabled:text-red-300 flex items-center gap-2"
                  >
                    {deletingUserId === user._id && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {deletingUserId === user._id ? 'Deleting...' : 'Delete'}
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