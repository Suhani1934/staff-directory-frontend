import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.info("Logout successful");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
          <i className="bi bi-people-fill me-2"></i>Department of Computer Science Directory
        </Link>

        {/* Custom Hamburger Toggle with Bootstrap Icons */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={toggleMenu}
        >
          <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"} fs-1`}></i>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/register" ? "active" : ""}`} to="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/faculty/profile" ? "active" : ""}`} to="/faculty/profile" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-warning ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
