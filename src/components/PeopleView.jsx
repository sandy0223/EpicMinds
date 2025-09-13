import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PeopleView.css';

export default function PeopleView() {
  const [people, setPeople] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', avatar: '', role: '' });

  useEffect(() => {
    fetch('/people.json')
      .then(res => res.json())
      .then(data => setPeople(data));
  }, []);

  const resetForm = () => setForm({ name: '', email: '', avatar: '', role: '' });

  const handleCreate = () => {
    if (!form.name || !form.email) {
      toast.error("Name and Email are required!");
      return;
    }
    const newPerson = { id: Date.now(), ...form };
    setPeople(prev => [newPerson, ...prev]);
    toast.success("Member added successfully!");
    resetForm();
    setFormVisible(false); // collapse form after creation
  };

  const handleEdit = person => {
    setEditingPerson(person);
    setForm({ name: person.name, email: person.email, avatar: person.avatar, role: person.role });
    setFormVisible(true);
  };

  const handleUpdate = () => {
    setPeople(prev =>
      prev.map(p => (p.id === editingPerson.id ? { ...p, ...form } : p))
    );
    toast.info("Member updated successfully!");
    setEditingPerson(null);
    resetForm();
    setFormVisible(false);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setPeople(prev => prev.filter(p => p.id !== id));
      toast.warn("Member deleted!");
    }
  };

  return (
    <div className="people-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Toggle Form Button */}
      {!formVisible && !editingPerson && (
        <button className="btn create w-full max-w-xs mb-4" onClick={() => setFormVisible(true)}>
          <FiPlus /> Add Member
        </button>
      )}

      {/* Form Section */}
      <div className={`form-card ${formVisible ? 'slide-down' : 'slide-up'}`}>
         {/* Close Button */}
  {formVisible && (
    <button
      className="form-close-btn"
      onClick={() => {
        setFormVisible(false);
        setEditingPerson(null);
        resetForm();
      }}
    >
      <FiX size={20} />
    </button>
  )}
        <h2 className="form-title">👥 {editingPerson ? 'Edit Member' : 'Add Member'}</h2>
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
            onChange={e =>
              setForm(prev => ({ ...prev, avatar: URL.createObjectURL(e.target.files[0]) }))
            }
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
                  setFormVisible(false);
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
