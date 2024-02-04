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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        loginData
      );
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
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className="authentication ">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Welcome back!</h1>
          <div>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                  value={loginData.email}
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword"
                  onChange={handleChange}
                  value={loginData.password}
                  name="password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-black"
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
      </div>
    </>
  );
}

export default Login;
