import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';
import './PeopleView.css';

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
    if(!form.name || !form.email) {
      alert("Name and Email are required!");
      return;
    }
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
    if (window.confirm('Are you sure you want to delete this member?')) {
      setPeople(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="people-container">
      {/* Form Section */}
      <div className="form-card animate-slideUp">
        <h2 className="form-title">👥 Manage Team Members</h2>
        <div className="form-fields">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setForm(prev => ({ ...prev, avatar: URL.createObjectURL(e.target.files[0]) }))}
            className="avatar-input"

          />
          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
          />

          {editingPerson ? (
            <div className="button-group">
              <button onClick={handleUpdate} className="btn save">
                <FiSave /> Update
              </button>
              <button
                onClick={() => {
                  setEditingPerson(null);
                  resetForm();
                }}
                className="btn cancel"
              >
                <FiX /> Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleCreate} className="btn create">
              <FiPlus /> Add Member
            </button>
          )}
        </div>
      </div>

      {/* People Grid */}
      <div className="members-section">
        <h3 className="section-title">✨ Team Members</h3>
        <div className="members-grid">
          {people.map(person => (
            <div className="fade-in" key={person.id}>
              <PersonCard
                person={person}
                onEdit={() => handleEdit(person)}
                onDelete={() => handleDelete(person.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
