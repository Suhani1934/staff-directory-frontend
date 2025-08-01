import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import "./Home.css";

export default function Home() {
  const [staff, setStaff] = useState([]);
  const [alumniCount, setAlumniCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}users/faculty`)
      .then((res) => setStaff(res.data));

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}alumni/count`)
      .then((res) => setAlumniCount(res.data.total))
      .catch((error) => console.error("Error fetching alumni count:", error));

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}students/count`)
      .then((res) => setStudentCount(res.data.count))
      .catch((err) => console.error("Error fetching student count", err));
  }, []);

  const cardData = [
    {
      title: "Total Faculty",
      value: staff.length,
      icon: <Briefcase size={36} className="text-primary" />,
      link: "/faculty-directory",
      bg: "white",
      shadow: "shadow-sm",
    },
    {
      title: "Total Alumni",
      value: alumniCount,
      icon: <GraduationCap size={36} className="text-success" />,
      link: "/alumni-directory",
      bg: "white",
      shadow: "shadow-sm",
    },
    {
      title: "Total Students",
      value: studentCount,
      icon: <Users size={36} className="text-info" />,
      link: "/student-directory",
      bg: "white",
      shadow: "shadow-sm",
    },
  ];

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">CS Directory Overview</h2>
        <p className="text-muted">
          Track and manage your campus community in one place
        </p>
      </div>

      <Row className="g-4 justify-content-center">
        {cardData.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Link to={card.link} className="text-decoration-none">
              <Card
                className={`h-100 ${card.shadow} border-0 rounded-4 transition-card`}
              >
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="mb-3">{card.icon}</div>
                  <h5 className="mb-1 text-dark">{card.title}</h5>
                  <h3 className="fw-bold text-secondary">{card.value}</h3>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
