import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';

export default function PeopleView() {
  const [people, setPeople] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', avatar: '', role: '' });

  useEffect(() => {
    fetch('/people.json')
      .then(res => res.json())
      .then(data => setPeople(data));
  }, []);

  const resetForm = () => setForm({ name: '', email: '', avatar: '', role: '' });

  const handleCreate = () => {
    const newPerson = { id: Date.now(), ...form };
    setPeople(prev => [newPerson, ...prev]);
    resetForm();
  };

  const handleEdit = person => {
    setEditingPerson(person);
    setForm({ name: person.name, email: person.email, avatar: person.avatar, role: person.role });
  };

  const handleUpdate = () => {
    setPeople(prev =>
      prev.map(p => (p.id === editingPerson.id ? { ...p, ...form } : p))
    );
    setEditingPerson(null);
    resetForm();
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure to delete this user?')) {
      setPeople(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">👥 Manage People</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Avatar URL"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            value={form.avatar}
            onChange={e => setForm(prev => ({ ...prev, avatar: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Role"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            value={form.role}
            onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
          />

          {editingPerson ? (
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition"
              >
                <FiSave /> Update
              </button>
              <button
                onClick={() => {
                  setEditingPerson(null);
                  resetForm();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow-sm transition"
              >
                <FiX /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition"
            >
              <FiPlus /> Create Person
            </button>
          )}
        </div>
      </div>

      {/* People Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              onEdit={() => handleEdit(person)}
              onDelete={() => handleDelete(person.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
