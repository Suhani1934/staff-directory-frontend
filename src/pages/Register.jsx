import { useState } from "react";
import FacultyRegister from "../components/FacultyRegister";
import AlumniRegister from "../components/AlumniRegister";
import StudentRegister from "../components/StudentRegister";

const Register = () => {
  const [userType, setUserType] = useState("");

  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="container py-5">
      {!userType && (
        <div className="text-center">
          <h2 className="mb-4 text-dark fw-bold">Choose Registration Type</h2>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <button
              className="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm"
              onClick={() => handleSelection("faculty")}
            >
              Register as Faculty
            </button>
            <button
              className="btn btn-outline-success px-4 py-2 rounded-pill shadow-sm"
              onClick={() => handleSelection("alumni")}
            >
              Register as Alumni
            </button>
            <button
              className="btn btn-outline-warning px-4 py-2 rounded-pill shadow-sm"
              onClick={() => handleSelection("student")}
            >
              Register as Student
            </button>
          </div>
        </div>
      )}

      {userType && (
        <div className="mt-5 p-4 bg-white rounded shadow-sm">
          {userType === "faculty" && <FacultyRegister />}
          {userType === "alumni" && <AlumniRegister />}
          {userType === "student" && <StudentRegister />}
        </div>
      )}
    </div>
  );
};

export default Register;
