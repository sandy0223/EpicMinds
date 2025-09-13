import React from 'react';
import { FiEdit2, FiTrash2, FiFile } from 'react-icons/fi';
import './FileItem.css';

export default function FileItem({ file, onEdit, onDelete }) {
  return (
    <div className="file-card">
      <div className="file-info">
        <div className="file-icon">
          <FiFile />
        </div>
        <div>
          <h4 className="file-name">{file.filename}</h4>
          <p className="file-size">📦 {file.size}</p>
          <p className="file-date">⏰ {file.uploadedAt}</p>
        </div>
      </div>

      <div className="file-actions">
        <button onClick={onEdit} className="btn edit">
          <FiEdit2 /> Edit
        </button>
        <button onClick={onDelete} className="btn delete">
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}
