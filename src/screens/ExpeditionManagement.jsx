
import { useState } from 'react';
import {
  useGetExpeditionsQuery,
  useAddExpeditionMutation,
  useUpdateExpeditionMutation,
  useDeleteExpeditionMutation
} from './../redux/reducers/features/expedition/expeditionThunks';

const ExpeditionManagement = () => {
  const { data: expeditions = [], isLoading, isError } = useGetExpeditionsQuery();
  const [addExpedition] = useAddExpeditionMutation();
  const [updateExpedition] = useUpdateExpeditionMutation();
  const [deleteExpedition] = useDeleteExpeditionMutation();

  const [newExpedition, setNewExpedition] = useState({
    name: '',
    location: '',
    date: '',
  });
  const [editingExpedition, setEditingExpedition] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpedition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateExpedition = async () => {
    try {
      await addExpedition(newExpedition).unwrap();
      setNewExpedition({ name: '', location: '', date: '' });
    } catch (error) {
      console.error('Failed to create expedition:', error);
    }
  };

  const handleEditExpedition = (expedition) => {
    setEditingExpedition(expedition);
    setNewExpedition(expedition);
  };

  const handleUpdateExpedition = async () => {
    try {
      await updateExpedition(editingExpedition).unwrap();
      setEditingExpedition(null);
      setNewExpedition({ name: '', location: '', date: '' });
    } catch (error) {
      console.error('Failed to update expedition:', error);
    }
  };

  const handleDeleteExpedition = async (id) => {
    try {
      await deleteExpedition(id).unwrap();
    } catch (error) {
      console.error('Failed to delete expedition:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading expeditions</div>;

  return (
    <div className="p-6 mt-14">
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
          value={newExpedition.name}
          onChange={handleInputChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newExpedition.location}
          onChange={handleInputChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="date"
          name="date"
          value={newExpedition.date}
          onChange={handleInputChange}
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

      {/* Expeditions List */}
      <div className="mt-6">
        {expeditions.map((expedition) => (
          <div key={expedition.id} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Expedition {expedition.id}
            </h3>
            <div className="mt-2">
              <p className="text-gray-600">
                <strong>Name:</strong> {expedition.name}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {expedition.location}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {expedition.date}
              </p>
            </div>
            <div className="flex mt-4">
              <button
                onClick={() => handleEditExpedition(expedition)}
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