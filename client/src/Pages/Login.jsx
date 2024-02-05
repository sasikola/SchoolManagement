import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/alertSlice";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "http://localhost:3000/api/user/login",
  //       loginData
  //     );
  //     console.log(response.data);
  //     dispatch(hideLoading());

  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       toast("Redirecting to home page");
  //       localStorage.setItem("token", response.data.token);
  //       navigate("/");
  //     } else {
  //       dispatch(hideLoading());
  //       toast.error(response.data.error);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     toast.error("Invalid Credentials");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        loginData
      );
      console.log(response.data);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        dispatch(hideLoading());
        toast.error(response.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response.status === 401) {
        // Handle 401 (Unauthorized) status code separately for incorrect credentials
        toast.error("Invalid email or password");
      } else {
        // Handle other errors
        toast.error("Unexpected error. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login Form</h2>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>

          <div className="mt-2">
            <Link to="/register">
              Click here to <b>Register</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
