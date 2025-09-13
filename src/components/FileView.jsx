import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import { FiPlus, FiSave, FiX, FiUpload } from 'react-icons/fi';
import './FileView.css';

export default function FileView() {
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [form, setForm] = useState({ filename: '', size: '', uploadedAt: '' });

  useEffect(() => {
    fetch('/files.json')
      .then(res => res.json())
      .then(data => setFiles(data));
  }, []);

  const resetForm = () => setForm({ filename: '', size: '', uploadedAt: '' });

  const handleUpload = () => {
    const newFile = { id: Date.now(), ...form };
    setFiles(prev => [newFile, ...prev]);
    resetForm();
  };

  const handleEdit = file => {
    setEditingFile(file);
    setForm({ filename: file.filename, size: file.size, uploadedAt: file.uploadedAt });
  };

  const handleUpdate = () => {
    setFiles(prev =>
      prev.map(f => (f.id === editingFile.id ? { ...f, ...form } : f))
    );
    setEditingFile(null);
    resetForm();
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure to delete this file?')) {
      setFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="file-view">
      {/* Upload / Edit Form */}
      <div className="form-card">
        <h2 className="form-title">📂 Manage Files</h2>
        <div className="form-fields">
          <input
            type="text"
            placeholder="File Name"
            className="form-input"
            value={form.filename}
            onChange={e => setForm(prev => ({ ...prev, filename: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Size (e.g. 1.2MB)"
            className="form-input"
            value={form.size}
            onChange={e => setForm(prev => ({ ...prev, size: e.target.value }))}
          />
          <input
            type="date"
            className="form-input"
            value={form.uploadedAt}
            onChange={e => setForm(prev => ({ ...prev, uploadedAt: e.target.value }))}
          />

          {editingFile ? (
            <div className="btn-group">
              <button onClick={handleUpdate} className="btn save">
                <FiSave /> Update
              </button>
              <button
                onClick={() => {
                  setEditingFile(null);
                  resetForm();
                }}
                className="btn cancel"
              >
                <FiX /> Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleUpload} className="btn upload">
              <FiUpload /> Upload File
            </button>
          )}
        </div>
      </div>

      {/* File List */}
      <div className="file-list">
        <h3 className="list-title">📑 Uploaded Files</h3>
        <div className="list-container">
          {files.map(file => (
            <FileItem
              key={file.id}
              file={file}
              onEdit={() => handleEdit(file)}
              onDelete={() => handleDelete(file.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
