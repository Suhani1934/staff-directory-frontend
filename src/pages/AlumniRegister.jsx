import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function AlumniRegister() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    designation: "",
    company: "",
    location: "",
    passedOutYear: "",
    photo: null,
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!contactRegex.test(form.mobile)) {
      toast.error("Contact must be 10 digits");
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      toast.error(
        "Password must be 8+ characters, include upper, lower, number & special symbol"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}alumni/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message || "Registration successful");
      navigate("/alumni/login");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">
          Alumni Registration
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            name="name"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Mobile Number"
            name="mobile"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Designation"
            name="designation"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Company/Organization"
            name="organization"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Location"
            name="location"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Passed Out Year"
            name="passedOutYear"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            type="file"
            name="photo"
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={handleChange}
          />

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>

          <div className="text-center">
            <small className="text-muted">
              Already registered?{" "}
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
