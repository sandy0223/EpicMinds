import React from 'react';

export default function FileItem({ file, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card flex items-center justify-between hover:shadow-xl transition-shadow transform hover:scale-[1.01]">
      <div>
        <h4 className="text-lg font-medium">{file.filename}</h4>
        <p className="text-gray-500 text-sm">Size: {file.size}</p>
        <p className="text-gray-400 text-xs">Uploaded: {file.uploadedAt}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
