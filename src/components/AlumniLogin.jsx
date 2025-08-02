import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function AlumniLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}alumni/login`,
        form
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">Alumni Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">
            Don't have an account?{" "}
            <Link
              to="/alumni/register"
              className="text-decoration-none fw-semibold text-primary"
            >
              Register here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
