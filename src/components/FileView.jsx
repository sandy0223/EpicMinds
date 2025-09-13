import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import { FiPlus, FiSave, FiX, FiUpload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FileView.css';

export default function FileView() {
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ filename: '', size: '', uploadedAt: '', fileObj: null });

  useEffect(() => {
    fetch('/files.json')
      .then(res => res.json())
      .then(data => setFiles(data));
  }, []);

  const resetForm = () => setForm({ filename: '', size: '', uploadedAt: '', fileObj: null });

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setForm(prev => ({
        ...prev,
        filename: file.name,
        size: sizeInMB,
        uploadedAt: new Date().toISOString().split('T')[0],
        fileObj: file
      }));
    }
  };

  const handleUpload = () => {
    if (!form.fileObj) {
      toast.error("Please select a file to upload!");
      return;
    }
    const newFile = { id: Date.now(), filename: form.filename, size: form.size, uploadedAt: form.uploadedAt };
    setFiles(prev => [newFile, ...prev]);
    toast.success("File uploaded successfully!");
    resetForm();
    setShowUpload(false);
  };

  const handleEdit = file => {
    setEditingFile(file);
    setForm({ filename: file.filename, size: file.size, uploadedAt: file.uploadedAt, fileObj: null });
    setShowUpload(true);
  };

  const handleUpdate = () => {
    setFiles(prev =>
      prev.map(f => (f.id === editingFile.id ? { ...f, ...form } : f))
    );
    toast.info("File updated successfully!");
    setEditingFile(null);
    resetForm();
    setShowUpload(false);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure to delete this file?')) {
      setFiles(prev => prev.filter(f => f.id !== id));
      toast.warn("File deleted!");
    }
  };

  return (
    <div className="file-view">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Toggle Upload Form Button */}
      <button
        className="toggle-upload-btn"
        onClick={() => setShowUpload(prev => !prev)}
      >
        {showUpload ? <><FiChevronUp /> Close</> : <><FiPlus /> Upload New File</>}
      </button>

      {/* Collapsible Upload / Edit Form */}
      {showUpload && (
        <div className="form-card">
          <h2 className="form-title">{editingFile ? "✏️ Edit File" : "📂 Upload File"}</h2>
          <div className="form-fields">
            <input
              type="file"
              className="form-input"
              onChange={handleFileChange}
            />

            <input
              type="text"
              placeholder="File Name"
              className="form-input"
              value={form.filename}
              readOnly
            />
            <input
              type="text"
              placeholder="Size"
              className="form-input"
              value={form.size}
              readOnly
            />
            <input
              type="date"
              className="form-input"
              value={form.uploadedAt}
              readOnly
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
                    setShowUpload(false);
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
      )}

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
