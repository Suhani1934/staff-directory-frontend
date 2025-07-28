import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";

const StaffCard = ({ staff }) => {
  return (
    <Card className="staff-profile shadow border-0 mb-4">
      <Row className="g-0">
        {/* Left Sidebar */}
        <Col md={4} className="text-white text-center d-flex flex-column justify-content-center align-items-center p-4 gradient-bg">
          <img
            src={staff.photo}
            alt={staff.name}
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <h5 className="fw-bold">{staff.name}</h5>
          <p className="mb-3">{staff.designation}</p>
        
        </Col>

        {/* Right Content */}
        <Col md={8} className="p-4">
          <h6 className="fw-bold border-bottom pb-2">Information</h6>
          <Row className="mb-3">
            <Col xs={6}><strong>Email:</strong><br />{staff.email}</Col>
            <Col xs={6}><strong>Phone:</strong><br />{staff.contact}</Col>
          </Row>

          <h6 className="fw-bold border-bottom pb-2">Department</h6>
          <p>{staff.department}</p>

          {/* You can add more sections if needed */}
        </Col>
      </Row>
    </Card>
  );
};

export default StaffCard;
