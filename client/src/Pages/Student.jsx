import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShowStudentsButton from "./ShowStudentsButton";
import AddStudentButton from "./AddStudentButton";
import DeleteStudent from "./DeleteStudent";
import { getStudent } from "../Redux/studentSlice";
import { hideLoading, showLoading } from "../Redux/alertSlice";

function Student({ studentId }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "https://school-mgmt-api.vercel.app/student/getStudent"
        );
        console.log(response.data);
        setStudents(response.data.students);
        setLoading(false);
        dispatch(hideLoading());
      } catch (error) {
        console.error("Error fetching student details:", error);
        setLoading(false);
        dispatch(hideLoading());
      }
    };

    fetchStudentDetails();
  }, []);

  const handleDelete = async () => {
    try {
      dispatch(showLoading());
      // Make an API request to delete the student
      await axios.delete(
        `https://school-mgmt-api.vercel.app/student/deleteStudent/${studentId}`
      );
      // Fetch updated student details after deletion
      const response = await axios.get(
        "http://localhost:3000/student/getStudent"
      );
      dispatch(getStudent(response.data.students));
      dispatch(hideLoading());
    } catch (error) {
      console.error("Error deleting student:", error);
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-end pt-2">
          <AddStudentButton />
          <ShowStudentsButton />
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
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(students) && students.length > 0 ? (
                  <>
                    {students?.map((student) => (
                      <tr key={student.id}>
                        <td className="px-4 py-2">{student.name}</td>
                        <td className="px-4 py-2">{student.age}</td>
                        <td className="px-4 py-2">{student.grade}</td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/edit/${student._id}`}
                            className="bg-green-500 text-white px-2 py-1 rounded-md me-2"
                          >
                            Update
                          </Link>
                          <DeleteStudent
                            studentId={student._id}
                            onDelete={handleDelete}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p>No Student details found.</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
