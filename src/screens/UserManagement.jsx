import  { useState } from 'react';
import Navbar from '../components/Navbar';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
    { id: 3, name: 'Alice Johnson', role: 'User' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', role: 'User' });

  const handleRoleChange = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleAddUser = () => {
    if (newUser.name.trim() !== '') {
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: Date.now(), name: newUser.name, role: newUser.role },
      ]);
      setNewUser({ name: '', role: 'User' }); // Reset input fields after adding
    }
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 mt-12">
      <Navbar />

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
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded-md"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
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
              <th className="py-2 px-4 text-left text-gray-600">Role</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 text-gray-700">{user.name}</td>
                <td className="py-2 px-4 text-gray-700">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-1 rounded-md"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Guest">Guest</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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
