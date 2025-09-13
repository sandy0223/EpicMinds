import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './PersonCard.css';

export default function PersonCard({ person, onEdit, onDelete }) {
  return (
    <div className="person-card">
      <div className="avatar-wrapper">
        <img src={person.avatar} alt={person.name} className="avatar" />
      </div>

      <div className="card-body">
        <h3 className="card-name">{person.name}</h3>
        <p className="card-role">{person.role}</p>
        <p className="card-email">{person.email}</p>

        <div className="card-actions">
          <button onClick={onEdit} className="btn edit">
            <FiEdit2 /> Edit
          </button>
          <button onClick={onDelete} className="btn delete">
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
