import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import ShowStudentsButton from "./ShowStudentsButton";
import AddStudentButton from "./AddStudentButton";

function CreateStudent() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/student/sendStudent",
        formData
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
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

  useEffect(() => {
    // Check if the user is logged in based on your authentication mechanism
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Toaster />
        <div className="flex justify-end">
          <AddStudentButton />
          <ShowStudentsButton />
        </div>
        <div className="flex min-h-screen  items-center justify-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded p-4 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-semibold">Add Student</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  className="form-input mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-100 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">
                  Age
                </label>
                <input
                  name="age"
                  type="age"
                  value={formData.age}
                  placeholder="Enter age"
                  className="form-input mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">
                  Grade
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="form-input mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStudent;
