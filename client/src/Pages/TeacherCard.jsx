import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteTeacher } from "../Redux/teacherSlice";
import DeleteTeacher from "./DeleteTeacher";

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  const handleDelete = (id) => {
    axios
      .delete(`https://school-mgmt-api.vercel.app/teacher/deleteTeacher/${id}`)
      .then((res) => {
        dispatch(deleteTeacher({ id }));
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <p className="text-lg font-semibold mb-2">Name: {teacher.name}</p>
        <p className="text-gray-600 mb-2">Subject: {teacher.subject}</p>
        <Link
          to={`/editTeacher/${teacher._id}`}
          className="bg-green-500 text-white px-2 py-1 rounded-md me-2"
        >
          Update
        </Link>

        <DeleteTeacher teacherId={teacher._id} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default TeacherCard;
