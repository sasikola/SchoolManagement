import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatedTeacher } from "../Redux/teacherSlice";

function UpdateTeacher() {
  const teacher = useSelector((state) => state.teacher.teacher);
  console.log(teacher);
  const { id } = useParams();
  //   const student = student.find((u) => u.id === id);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://school-mgmt-api.vercel.app/teacher/updateTeacher/${id}`, formData)
      .then((res) => {
        console.log(res);
        dispatch(updatedTeacher({ id, formData }));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
      });
  };
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded p-4 shadow-lg">
        <form onSubmit={handleUpdate} className="space-y-4">
          <h2 className="text-2xl font-semibold">Update Teacher</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-input mt-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              className="form-input mt-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={handleChange}
              value={formData.subject}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTeacher;
