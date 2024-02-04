// src/components/AddUserButton.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddStudentButton = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in based on your authentication mechanism
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleAddUser = () => {
    if (isLoggedIn) {
      navigate("/createStudent");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="mt-2 sm: mb-6">
        {/* <Link
          to="/create"
          className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600"
        >
          Add User
        </Link> */}
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600"
        >
          Add Student
        </button>
      </div>
    </>
  );
};

export default AddStudentButton;
