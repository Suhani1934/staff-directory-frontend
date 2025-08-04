import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const FacultyDirectory = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}users/faculty`
        );
        setFacultyList(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch faculty data", err);
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="container py-5" style={{ backgroundColor: "#f8fafc" }}>
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#1e293b" }}>
        Faculty Directory
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row g-4">
          {facultyList.map((faculty) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={faculty._id}
            >
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#ffffff", borderRadius: "1rem" }}
              >
                <img
                  src={faculty.photo}
                  className="card-img-top"
                  alt={faculty.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                <div className="card-body text-right">
                  <h5
                    className="card-title fw-bold text-center"
                    style={{ color: "#0f172a" }}
                  >
                    {faculty.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "0.9rem", color: "#475569" }}
                  >
                    <strong>Designation:</strong> {faculty.designation}
                    <br />
                    <strong>Department:</strong> {faculty.department}
                    <br />
                    <strong>Email:</strong> {faculty.email}
                    <br />
                    <strong>Contact:</strong> {faculty.contact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyDirectory;
