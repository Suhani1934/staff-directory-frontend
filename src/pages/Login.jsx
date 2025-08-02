import { useState } from "react";
import FacultyLogin from "../components/FacultyLogin";
import AlumniLogin from "../components/AlumniLogin";
import StudentLogin from "../components/StudentLogin";

const Login = () => {
  const [userType, setUserType] = useState("");

  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="container py-5">
      {!userType && (
        <div className="text-center">
          <h3 className="mb-4 text-dark fw-bold">Select Login Type</h3>
          <div className="d-grid gap-3 d-sm-flex justify-content-center">
            <button
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
              onClick={() => handleSelection("faculty")}
            >
              Faculty
            </button>
            <button
              className="btn btn-success px-4 py-2 rounded-pill shadow-sm"
              onClick={() => handleSelection("alumni")}
            >
              Alumni
            </button>
            <button
              className="btn btn-warning px-4 py-2 rounded-pill shadow-sm"
              onClick={() => handleSelection("student")}
            >
              Student
            </button>
          </div>
        </div>
      )}

      {userType && (
        <div className="mt-4">
          {userType === "faculty" && <FacultyLogin />}
          {userType === "alumni" && <AlumniLogin />}
          {userType === "student" && <StudentLogin />}
        </div>
      )}
    </div>
  );
};

export default Login;
