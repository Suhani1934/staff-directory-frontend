import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FacultyProfile from "./pages/FacultyProfile";
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
          <Route path="/faculty/profile" element={<FacultyProfile />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}
