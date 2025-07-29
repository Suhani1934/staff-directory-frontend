import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./Home.css";
import StaffStatusCard from "../components/StaffStatusCard";
import StaffCard from "../components/StaffCard";

export default function Home() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}users/staff`).then((res) => {
      setStaff(res.data);
    });
  }, []);

  return (
    <Container className="py-5">
      {/* Status bar */}
      <StaffStatusCard totalStaff={staff.length} />

      {/* Staff Cards */}
      <Row>
        {staff.map((s) => (
          <Col lg={4} md={6} sm={12} key={s._id} className="mb-4">
            <StaffCard staff={s} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
