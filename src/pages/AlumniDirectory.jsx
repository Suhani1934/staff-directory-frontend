import { useEffect, useState } from "react";
import axios from "axios";

const AlumniDirectory = () => {
  const [alumniList, setAlumniList] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}alumni/profiles`
        );
        setAlumniList(res.data);
      } catch (err) {
        console.error("Failed to fetch alumni data", err);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div className="container py-5" style={{ backgroundColor: "#f8fafc" }}>
      <h2 className="text-center fw-bold mb-5" style={{ color: "#1e293b" }}>
        Alumni Directory
      </h2>

      <div className="row g-4">
        {alumniList.map((alumni) => (
          <div className="col-md-6 col-lg-4" key={alumni._id}>
            <div
              className="card border-0 h-100 shadow-sm"
              style={{ backgroundColor: "#ffffff", borderRadius: "1rem" }}
            >
              <img
                src={alumni.photo}
                className="card-img-top rounded-top"
                alt={alumni.name}
                style={{
                  height: "250px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
              <div className="card-body px-4 py-3">
                <h5 className="card-title fw-bold text-center" style={{ color: "#0f172a" }}>
                  {alumni.name}
                </h5>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {alumni.email}
                </p>
                <p className="card-text mb-1">
                  <strong>Mobile:</strong> {alumni.mobile}
                </p>
                <p className="card-text mb-1">
                  <strong>Designation:</strong> {alumni.designation}
                </p>
                <p className="card-text mb-1">
                  <strong>Company:</strong> {alumni.organization}
                </p>
                <p className="card-text mb-1">
                  <strong>Location:</strong> {alumni.location}
                </p>
                <p className="card-text mb-0">
                  <strong>Passed Out Year:</strong> {alumni.passedOutYear}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniDirectory;
