import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./FacultyProfile.css"; // Custom styles

const FacultyProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    photo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}users/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg profile-card">
        <div className="card-body">
          <h3 className="mb-4 text-center profile-title">Faculty Profile</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              {["name", "email", "contact", "department", "designation"].map(
                (field) => (
                  <div className="col-md-6 mb-3" key={field}>
                    <label className="form-label text-dark">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      className="form-control"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Update Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.files[0] })
                }
              />
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 fw-semibold rounded-3 shadow"
                style={{ backgroundColor: "#0d6efd", border: "none" }}
              >
                <i className="bi bi-save"></i> Update Profile
              </button>

              <Link
                to="/change-password"
                className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2 fw-semibold rounded-3 shadow-sm"
              >
                <i className="bi bi-shield-lock"></i> Change Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
