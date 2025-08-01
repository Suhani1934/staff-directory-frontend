// src/pages/StudentLogin.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}students/login`, {
        email,
        password,
      });

      localStorage.setItem("studentToken", res.data.token);
      toast.success("Login successful");
      navigate("/"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <div className="text-center mt-3">
          <small className="text-muted">
            Don't have an account?{" "}
            <Link
              to="/students/register"
              className="text-decoration-none fw-semibold text-primary"
            >
              Register here
            </Link>
          </small>
        </div>
    </div>
  );
};

export default StudentLogin;
