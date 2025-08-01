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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Alumni Directory</h2>
      <div className="row">
        {alumniList.map((alumni) => (
          <div className="col-md-4 mb-4" key={alumni._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={alumni.photo}
                className="card-img-top"
                alt={alumni.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{alumni.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {alumni.email}
                  <br />
                  <strong>Mobile:</strong> {alumni.mobile}
                  <br />
                  <strong>Designation:</strong> {alumni.designation}
                  <br />
                  <strong>Company:</strong> {alumni.company}
                  <br />
                  <strong>Location:</strong> {alumni.location}
                  <br />
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
