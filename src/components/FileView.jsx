import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-card">
        <h2 className="text-xl font-semibold mb-4">Manage Files</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="File Name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
            value={form.filename}
            onChange={e => setForm(prev => ({ ...prev, filename: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Size (e.g. 1.2MB)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
            value={form.size}
            onChange={e => setForm(prev => ({ ...prev, size: e.target.value }))}
          />
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
            value={form.uploadedAt}
            onChange={e => setForm(prev => ({ ...prev, uploadedAt: e.target.value }))}
          />
          {editingFile ? (
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setEditingFile(null);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Upload File
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
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
  );
}
