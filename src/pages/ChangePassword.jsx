import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return pattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}users/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Password updated successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center text-primary fw-bold mb-4">
          Change Password
        </h3>
        <form onSubmit={handleSubmit}>
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-muted">
                  {field
                    .replace("Password", " Password")
                    .replace(/([A-Z])/g, " $1")}
                </label>
                <div className="input-group">
                  <input
                    type={showPassword[field] ? "text" : "password"}
                    className="form-control"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field
                      .replace("Password", " password")
                      .toLowerCase()}`}
                    required
                  />
                  <span
                    className="input-group-text bg-white border-start-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleVisibility(field)}
                  >
                    {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            )
          )}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
