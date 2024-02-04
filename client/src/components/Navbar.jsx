// Navbar.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    // Check if the user is logged in based on your authentication mechanism
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Update the authentication status
    setIsLoggedIn(false);
    toast.success("Logged out Successfully");
    window.location.reload();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <Link
        to="/"
        className="container mx-auto flex justify-between items-center"
      >
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-white text-3xl font-semibold"> SM</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center">
          {isLoggedIn ? (
            // If logged in, show logout button
            <>
              <button
                className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                onClick={handleLogout}
              >
                Logout
              </button>
              <h2 className="text-white ml-3">{user?.name || "Guest"} </h2>
              {user?.isTeacher ? (
                <h1 className="text-white ml-1"> (Teacher)</h1>
              ) : (
                <h1 className="text-white ml-1"> (Student)</h1>
              )}
            </>
          ) : (
            // If not logged in, show login and register buttons
            <>
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded-md mr-4 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white px-4 py-2 rounded-md mr-4 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Register
              </Link>
              {/* Add your register button or link here */}
              <h2 className="text-white">{user?.name || "Guest"} </h2>
              {user?.isTeacher ? (
                <h1 className="text-white ml-1"> (Teacher)</h1>
              ) : (
                <h1 className="text-white ml-1"> (Student)</h1>
              )}
            </>
          )}
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
