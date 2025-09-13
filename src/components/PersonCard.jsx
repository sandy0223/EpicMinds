import React from 'react';

export default function PersonCard({ person, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-shadow transform hover:-translate-y-1">
      <img src={person.avatar} alt={person.name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <p className="text-gray-600">{person.role}</p>
        <p className="text-gray-500 text-sm mt-1">{person.email}</p>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={onEdit}
            className="flex-1 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
