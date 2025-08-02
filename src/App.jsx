import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Register Pages
import FacultyRegister from "./components/FacultyRegister";
import AlumniRegister from "./components/AlumniRegister";
import StudentRegister from "./components/StudentRegister";

// Login Pages
import FacultyLogin from "./components/FacultyLogin";
import AlumniLogin from "./components/AlumniLogin";
import StuentLogin from "./components/StudentLogin";

// Directory Pages
import FacultyDirectory from "./pages/FacultyDirectory";
import AlumniDirectory from "./pages/AlumniDirectory";
import StudentDirectory from "./pages/StudentDirectory";

//  Profile Pages
import FacultyProfile from "./pages/FacultyProfile";

import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-left" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Login Forms */}
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/alumni/login" element={<AlumniLogin />} />
          <Route path="/students/login" element={<StuentLogin />} />

          {/* Registration Forms */}
          <Route path="/faculty/register" element={<FacultyRegister />} />
          <Route path="/alumni/register" element={<AlumniRegister />} />
          <Route path="/students/register" element={<StudentRegister />} />

          {/* Directory Pages */}
          <Route path="/faculty-directory" element={<FacultyDirectory />} />
          <Route path="/alumni-directory" element={<AlumniDirectory />} />
          <Route path="/student-directory" element={<StudentDirectory />} />

          {/* Profile Pages */}
          <Route path="/faculty/profile" element={<FacultyProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}
