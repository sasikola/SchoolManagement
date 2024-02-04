import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import AddTeacherButton from "./AddTeacherButton";
import ShowTeacherButton from "./ShowTeacherButton";
import DeleteTeacher from "./DeleteTeacher";
import { getTeacher } from "../Redux/teacherSlice";

function Teacher({ teacherId }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:3000/teacher/getTeacher"
        );
        console.log(response.data);
        setTeachers(response.data);
        setLoading(false);
        dispatch(hideLoading());
      } catch (error) {
        console.error("Error fetching teacher details:", error);
        setLoading(false);
        dispatch(hideLoading());
      }
    };

    fetchTeacherDetails();
  }, []);

  const handleDelete = async () => {
    try {
      dispatch(showLoading());
      // Make an API request to delete the student
      await axios.delete(
        `http://localhost:3000/teacher/deleteTeacher/${teacherId}`
      );
      // Fetch updated student details after deletion
      const response = await axios.get(
        "http://localhost:3000/teacher/getTeacher"
      );
      dispatch(getTeacher(response.data.teachers));
      dispatch(hideLoading());
    } catch (error) {
      console.error("Error deleting teachers:", error);
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-end pt-2">
          <AddTeacherButton />
          <ShowTeacherButton />
        </div>

        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2 bg-white rounded p-4 shadow-lg">
            <Link
              to="/create"
              className="bg-green-500 text-white px-2 py-1 rounded-md"
            >
              Add +
            </Link>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(teachers) && teachers.length > 0 ? (
                  <>
                    {teachers?.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="px-4 py-2">{teacher.name}</td>
                        <td className="px-4 py-2">{teacher.subject}</td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/editTeacher/${teacher._id}`}
                            className="bg-green-500 text-white px-2 py-1 rounded-md me-2"
                          >
                            Update
                          </Link>
                          <DeleteTeacher
                            teacherId={teacher._id}
                            onDelete={handleDelete}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p>No Teacher details found.</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
