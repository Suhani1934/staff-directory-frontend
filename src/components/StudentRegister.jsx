// src/pages/StudentRegister.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { courses, years } from "../data/course";

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
      navigate("/students/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow rounded-4 border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center text-primary mb-4 fw-bold">
                Student Registration
              </h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map((course, idx) => (
                        <option key={idx} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  {/* Area of Interest */}
                  <div className="col-12">
                    <label className="form-label">Area of Interest</label>
                    <div className="input-group">
                      <input
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        className="form-control"
                        placeholder="Add interest"
                      />
                      <button
                        type="button"
                        onClick={addInterest}
                        className="btn btn-outline-primary"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {formData.areaOfInterest.map((item, idx) => (
                        <span
                          key={idx}
                          className="badge rounded-pill bg-info text-dark px-3 py-2"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="col-12">
                    <label className="form-label">Skills</label>
                    <div className="input-group">
                      <input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="form-control"
                        placeholder="Add skill"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="btn btn-outline-primary"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {formData.skills.map((item, idx) => (
                        <span
                          key={idx}
                          className="badge rounded-pill bg-success text-white px-3 py-2"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col-12">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Address"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
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
                  <div className="col-md-6">
                    <label className="form-label">Upload Photo</label>
                    <input
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      className="form-control"
                      accept="image/*"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4 fw-semibold py-2"
                >
                  Register
                </button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Already registered?{" "}
                    <Link
                      to="/students/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Login here
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
