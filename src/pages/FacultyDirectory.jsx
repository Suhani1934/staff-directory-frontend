import { useEffect, useState } from "react";
import axios from "axios";

const FacultyDirectory = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}users/faculty`);
        setFacultyList(res.data);
      } catch (err) {
        console.error("Failed to fetch faculty data", err);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Faculty Directory</h2>
      <div className="row">
        {facultyList.map((faculty) => (
          <div className="col-md-4 mb-4" key={faculty._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={faculty.photo}
                className="card-img-top"
                alt={faculty.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{faculty.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {faculty.email}<br />
                  <strong>Contact:</strong> {faculty.contact}<br />
                  <strong>Department:</strong> {faculty.department}<br />
                  <strong>Designation:</strong> {faculty.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDirectory;
