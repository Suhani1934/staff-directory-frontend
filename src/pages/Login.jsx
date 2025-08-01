import { useState } from "react";
import FacultyLogin from "../components/FacultyLogin";
import AlumniLogin from "../components/AlumniLogin";

const Register = () => {
  const [userType, setUserType] = useState("");

  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="container mt-5">
      {!userType && (
        <div className="text-center">
          <p>Select login type:</p>
          <button className="btn btn-primary mx-2" onClick={() => handleSelection("faculty")}>
            Login as Faculty
          </button>
          <button className="btn btn-secondary mx-2" onClick={() => handleSelection("alumni")}>
            Login as Alumni
          </button>
        </div>
      )}

      {userType === "faculty" && (
        <div className="mt-4">
          <FacultyLogin />
        </div>
      )}

      {userType === "alumni" && (
        <div className="mt-4">
          <AlumniLogin />
        </div>
      )}
    </div>
  );
};

export default Register;
