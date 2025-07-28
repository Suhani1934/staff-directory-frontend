// frontend/src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    password: "",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card register-card shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">
          Staff Registration
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <input
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="contact"
              onChange={handleChange}
              placeholder="Contact Number"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="department"
              onChange={handleChange}
              placeholder="Department"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="designation"
              onChange={handleChange}
              placeholder="Designation"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted">
              Upload Profile Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button className="btn btn-primary btn-lg">Register</button>
          </div>
          <div className="text-center">
            <small className="text-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-decoration-none text-primary fw-semibold"
              >
                Login here
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
