import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../Redux/studentSlice";
import toast from "react-hot-toast";

const DeleteStudent = ({ studentId, onDelete }) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  const handleDelete = (id) => {
    axios
      .delete(`https://school-mgmt-api.vercel.app/student/deleteStudent/${id}`)
      .then((res) => {
        dispatch(deleteStudent({ id }));
        onDelete(studentId);
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={() => handleDelete(studentId)}
      className="bg-red-500 text-white px-2 py-1 rounded-md"
    >
      Delete
    </button>
  );
};

export default DeleteStudent;
