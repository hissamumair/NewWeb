import { useState } from 'react';
import Navbar from '../components/Navbar';

const ExpeditionManagement = () => {
  // State to hold expeditions data
  const [expeditions, setExpeditions] = useState([
    { id: 1, name: 'Mountain Expedition', location: 'Mount Everest', date: '2024-05-20' },
    { id: 2, name: 'Desert Expedition', location: 'Sahara Desert', date: '2024-06-15' },
    { id: 3, name: 'Rainforest Expedition', location: 'Amazon Rainforest', date: '2024-07-10' },
  ]);

  const [newExpedition, setNewExpedition] = useState({
    name: '',
    location: '',
    date: '',
  });

  const [editingExpedition, setEditingExpedition] = useState(null);

  // Handle change in form input for new/edited expeditions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpedition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create a new expedition
  const handleCreateExpedition = () => {
    setExpeditions((prev) => [
      ...prev,
      { ...newExpedition, id: prev.length + 1 },
    ]);
    setNewExpedition({ name: '', location: '', date: '' });
  };

  // Edit an existing expedition
  const handleEditExpedition = (id) => {
    const expeditionToEdit = expeditions.find((exp) => exp.id === id);
    setEditingExpedition(expeditionToEdit);
  };

  // Update an edited expedition
  const handleUpdateExpedition = () => {
    setExpeditions((prev) =>
      prev.map((exp) =>
        exp.id === editingExpedition.id ? editingExpedition : exp
      )
    );
    setEditingExpedition(null);
  };

  // Delete an expedition
  const handleDeleteExpedition = (id) => {
    setExpeditions((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <div className="p-6 mt-14">
      <Navbar />

      <h1 className="text-2xl font-semibold text-gray-800">Expedition Management</h1>
      <p className="mt-4 text-gray-600">
        This is where you can manage expeditions and their details.
      </p>

      {/* Expedition Form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingExpedition ? 'Edit Expedition' : 'Create New Expedition'}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Expedition Name"
          value={editingExpedition ? editingExpedition.name : newExpedition.name}
          onChange={(e) => {
            const { name, value } = e.target;
            editingExpedition
              ? setEditingExpedition({ ...editingExpedition, [name]: value })
              : handleInputChange(e);
          }}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={editingExpedition ? editingExpedition.location : newExpedition.location}
          onChange={(e) => {
            const { name, value } = e.target;
            editingExpedition
              ? setEditingExpedition({ ...editingExpedition, [name]: value })
              : handleInputChange(e);
          }}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="date"
          name="date"
          value={editingExpedition ? editingExpedition.date : newExpedition.date}
          onChange={(e) => {
            const { name, value } = e.target;
            editingExpedition
              ? setEditingExpedition({ ...editingExpedition, [name]: value })
              : handleInputChange(e);
          }}
          className="border p-2 mb-4 w-full"
        />

        <div className="flex justify-end">
          {editingExpedition ? (
            <button
              onClick={handleUpdateExpedition}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Update Expedition
            </button>
          ) : (
            <button
              onClick={handleCreateExpedition}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Create Expedition
            </button>
          )}
        </div>
      </div>

      {/* Vertical Table for Expedition Details */}
      <div className="mt-6">
        {expeditions.map((expedition) => (
          <div key={expedition.id} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Expedition {expedition.id}</h3>
            <div className="mt-2">
              <p className="text-gray-600"><strong>Name:</strong> {expedition.name}</p>
              <p className="text-gray-600"><strong>Location:</strong> {expedition.location}</p>
              <p className="text-gray-600"><strong>Date:</strong> {expedition.date}</p>
            </div>
            <div className="flex mt-4">
              <button
                onClick={() => handleEditExpedition(expedition.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteExpedition(expedition.id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpeditionManagement;
