import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ShowStudentsButton() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleShowUsers = () => {
    if (isLoggedIn) {
      navigate("/student");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="mx-2 mt-2 sm:mb-4">
      {/* <Link
        to="/user"
        className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600"
      >
        Show USers
      </Link> */}
      <button onClick={handleShowUsers} className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600">Show Students</button>
      
    </div>
  );
}

export default ShowStudentsButton;