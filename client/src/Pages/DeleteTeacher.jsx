import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteTeacher } from "../Redux/teacherSlice";

const DeleteTeacher = ({ teacherId, onDelete }) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  const handleDelete = (id) => {
    axios
      .delete(`https://school-mgmt-api.vercel.app/teacher/deleteTeacher/${id}`)
      .then((res) => {
        dispatch(deleteTeacher({ id }));
        onDelete(teacherId);
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={() => handleDelete(teacherId)}
      className="bg-red-500 text-white px-2 py-1 rounded-md"
    >
      Delete
    </button>
  );
};

export default DeleteTeacher;
