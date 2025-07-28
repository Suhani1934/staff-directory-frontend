import React from 'react';
import './StatusCards.css'; // for custom styles if needed

export default function StaffStatusCard({ totalStaff }) {
  return (
    <div className="container mb-5">
      <h3 className="mb-4 fw-bold">Faculty Directory</h3>
      <div className="row g-3">
        <div className="col-md-3 col-sm-6">
          <div className="p-4 text-white text-center rounded status-card bg-primary">
            <h6 className="mb-1">Total Staff</h6>
            <h3 className="fw-bold">{totalStaff}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}
