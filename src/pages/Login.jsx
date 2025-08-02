import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://your-backend-url/api/auth/login", formData);
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      toast.success("Login successful!");

      // 🔄 Redirect based on role
      if (role === "faculty") navigate("/faculty/profile");
      else if (role === "alumni") navigate("/alumni/profile");
      else if (role === "student") navigate("/student/profile");
      else toast.error("Unknown role");
    } catch (err) {
      console.log(err);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
