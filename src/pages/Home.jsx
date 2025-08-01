import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import StatusCard from "../components/StatusCard"; 

export default function Home() {
  const [staff, setStaff] = useState([]);
  const [alumniCount, setAlumniCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}users/faculty`)
      .then((res) => {
        setStaff(res.data);
      });

    const fetchAlumniCount = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}alumni/count`
        );
        setAlumniCount(res.data.total);
      } catch (error) {
        console.error("Error fetching alumni count:", error);
      }
    };

    fetchAlumniCount();
  }, []);

  return (
    <Container className="py-5">
      {/* Status Cards Row */}
      <Row className="mb-4">
        <Link
          to="/faculty-directory"
          className="col-md-4 mb-3"
          style={{ textDecoration: "none" }}
        >
          <Col md={6}>
            <StatusCard
              title="Total Faculty"
              value={staff.length}
              bg="primary"
              icon="🧑‍🏫"
            />
          </Col>
        </Link>
        <Link
          to="/alumni-directory"
          className="col-md-4 mb-3"
          style={{ textDecoration: "none" }}
        >
          <Col md={6}>
            <StatusCard
              title="Total Alumni"
              value={alumniCount}
              bg="success"
              icon="👨‍🎓"
            />
          </Col>
        </Link>
      </Row>
    </Container>
  );
}
