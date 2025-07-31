import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { PencilSquare, ShieldLock } from "react-bootstrap-icons";
import "./FacultyProfile.css";

const FacultyProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    photo: "",
  });

  const [preview, setPreview] = useState(null);
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
        if (res.data.photo) {
          setPreview(res.data.photo);
        }
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
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
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg border-0 rounded-4 bg-light">
        <h3 className="text-center text-primary fw-bold mb-4">
          Faculty Profile
        </h3>

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 mb-4">
          <div className="text-center">
            <img
              src={
                preview ||
                "https://res.cloudinary.com/dkgn0gsiv/image/upload/v1753952383/staff-photos/ghifbkw1z2rurxbrmink.png"
              }
              alt="Profile Preview"
              className="rounded-circle border border-3"
              style={{ width: "130px", height: "130px", objectFit: "cover" }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            {["name", "email", "contact", "department", "designation"].map(
              (field) => (
                <div className="col-md-6 mb-3" key={field}>
                  <label className="form-label fw-semibold text-secondary">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
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

          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">
              Upload New Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              name="photo"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 fw-semibold shadow-sm"
            >
              <PencilSquare /> Update Profile
            </button>

            <Link
              to="/change-password"
              className="btn btn-outline-dark d-flex align-items-center gap-2 px-4 py-2 fw-semibold shadow-sm"
            >
              <ShieldLock /> Change Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyProfile;
