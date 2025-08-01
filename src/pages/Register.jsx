import { useState } from "react";
import FacultyRegister from "../components/FacultyRegister";
import AlumniRegister from "../components/AlumniRegister";
import StudentRegister from "../components/StudentRegister"

const Register = () => {
  const [userType, setUserType] = useState("");

  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="container mt-5">
      {!userType && (
        <div className="text-center">
          <p>Select registration type:</p>
          <button className="btn btn-primary mx-2" onClick={() => handleSelection("faculty")}>
            Register as Faculty
          </button>
          <button className="btn btn-secondary mx-2" onClick={() => handleSelection("alumni")}>
            Register as Alumni
          </button>
          <button className="btn btn-secondary mx-2" onClick={() => handleSelection("student")}>
            Register as Student
          </button>
        </div>
      )}

      {userType === "faculty" && (
        <div className="mt-4">
          <FacultyRegister />
        </div>
      )}

      {userType === "alumni" && (
        <div className="mt-4">
          <AlumniRegister />
        </div>
      )}
      {userType === "student" && (
        <div className="mt-4">
          <StudentRegister />
        </div>
      )}
    </div>
  );
};

export default Register;
