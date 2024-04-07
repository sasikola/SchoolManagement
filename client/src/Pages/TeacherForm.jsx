// src/components/TeacherForm.js
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import toast from "react-hot-toast";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
  });
  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
        // navigate("/");
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
    <div className="mx-auto max-w-md bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Teacher</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="subject"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
