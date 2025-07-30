// src/pages/FacultyProfile.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div className="container mt-4">
      <h2>Faculty Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {["name", "email", "contact", "department", "designation"].map(
          (field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">
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

        <div className="mb-3">
          <label className="form-label">Update Photo</label>
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

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default FacultyProfile;
