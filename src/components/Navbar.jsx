import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css"; // Import custom styles

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-blue shadow py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold brand-text" to="/">
          <i className="bi bi-people-fill me-2"></i>DSVV Directory
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3 align-items-center">
            {isLoggedIn ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-warning logout-btn">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-yellow nav-btn" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light nav-btn" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
