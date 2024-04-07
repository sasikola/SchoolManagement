import { Link } from "react-router-dom";
import DeleteStudent from "./DeleteStudent";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteStudent } from "../Redux/studentSlice";
import toast from "react-hot-toast";

const StudentCard = ({student}) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  const handleDelete = (id) => {
    axios
      .delete(`https://school-mgmt-api.vercel.app/student/deleteStudent/${id}`)
      .then((res) => {
        dispatch(deleteStudent({ id }));
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <p className="text-lg font-semibold mb-2">Name: {student.name}</p>
        <p className="text-gray-600 mb-2">Age: {student.age}</p>
        <p className="text-gray-600">Grade: {student.grade}</p>
        <Link
          to={`/edit/${student._id}`}
          className="bg-green-500 text-white px-2 py-1 rounded-md me-2"
        >
          Update
        </Link>

        <DeleteStudent studentId={student._id} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default StudentCard;
