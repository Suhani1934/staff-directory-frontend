import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FacultyProfile from "./pages/FacultyProfile";
import ChangePassword from "./pages/ChangePassword";
import AlumniLogin from "./components/AlumniLogin";
import FacultyLogin from "./components/FacultyLogin";
import AlumniRegister from "./components/AlumniRegister";
import FacultyRegister from "./components/FacultyRegister";
import FacultyDirectory from "./pages/FacultyDirectory";
import AlumniDirectory from "./pages/AlumniDirectory";
import { ToastContainer } from "react-toastify";
import "./App.css";

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
          <Route path="/faculty/register" element={<FacultyRegister />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/faculty/profile" element={<FacultyProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/alumni/login" element={<AlumniLogin />} />
          <Route path="/alumni/register" element={<AlumniRegister />} />
          <Route path="/faculty-directory" element={<FacultyDirectory />} />
          <Route path="/alumni-directory" element={<AlumniDirectory />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}
