import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export default function StudentDirectory() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}students/profiles`)
      .then((res) => {
        setStudentList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#1e293b", fontSize: "2.5rem" }}>
        Student Directory
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {studentList.map((student) => (
            <Col key={student._id} xs={12} sm={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm student-card">
                <Card.Img
                  variant="top"
                  src={student.photo}
                  alt={student.name}
                  className="rounded-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="bg-light-subtle">
                  <Card.Title className="fw-bold text-primary mb-2 text-center">
                    {student.name}
                  </Card.Title>
                  <Card.Text className="text-secondary" style={{ fontSize: "0.95rem" }}>
                    <strong>Course:</strong> {student.course} <br />
                    <strong>Year:</strong> {student.year} <br />
                    <strong>Gender:</strong> {student.gender} <br />
                    <strong>Mobile:</strong> {student.mobile} <br />
                    <strong>Email:</strong> {student.email} <br />
                    <strong>Interest:</strong> {student.areaOfInterest.join(", ")} <br />
                    <strong>Skills:</strong> {student.skills.join(", ")} <br />
                    <strong>Address:</strong> {student.address}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      
    </Container>
  );
}
