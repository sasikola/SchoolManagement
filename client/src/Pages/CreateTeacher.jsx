import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import AddTeacherButton from "./AddTeacherButton";
import ShowTeacherButton from "./ShowTeacherButton";

function CreateTeacher() {
  const [formData, setFormData] = useState({
    name: "",
   subject:""
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
        "https://school-mgmt-api.vercel.app/teacher/sendTeacher",
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
          <AddTeacherButton/>
          <ShowTeacherButton />
        </div>
        <div className="flex min-h-screen  items-center justify-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded p-4 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-semibold">Add Teacher</h2>
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
                  Subject
                </label>
                <input
                  name="subject"
                  type="subject"
                  value={formData.subject}
                  placeholder="Enter subject"
                  className="form-input mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
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

export default CreateTeacher;
