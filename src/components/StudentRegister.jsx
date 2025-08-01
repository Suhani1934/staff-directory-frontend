// src/pages/StudentRegister.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    year: "",
    mobile: "",
    email: "",
    gender: "",
    areaOfInterest: [],
    skills: [],
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addInterest = () => {
    if (interestInput) {
      setFormData({
        ...formData,
        areaOfInterest: [...formData.areaOfInterest, interestInput],
      });
      setInterestInput("");
    }
  };

  const addSkill = () => {
    if (skillInput) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput],
      });
      setSkillInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      toast.error("Please upload a photo.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    });
    form.append("photo", photo);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}students/register`,
        form
      );
      toast.success("Student registered successfully");
      navigate("/alumni/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="form-control"
            placeholder="Course (e.g. BCA)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="form-control"
            placeholder="Year (e.g. 3rd)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
            placeholder="Mobile Number"
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Area of Interest</label>
          <div className="d-flex">
            <input
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="form-control me-2"
              placeholder="Add interest"
            />
            <button
              type="button"
              onClick={addInterest}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
          <ul>
            {formData.areaOfInterest.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <label>Skills</label>
          <div className="d-flex">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="form-control me-2"
              placeholder="Add skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
          <ul>
            {formData.skills.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <label>Upload Photo</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="form-control"
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
        <div className="text-center">
            <small className="text-muted">
              Already registered?{" "}
              <Link
                to="/students/login"
                className="text-decoration-none text-primary fw-semibold"
              >
                Login here
              </Link>
            </small>
          </div>
      </form>
    </div>
  );
};

export default StudentRegister;
