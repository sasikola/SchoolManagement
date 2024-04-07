// Import the StudentCard component if not already imported
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "./StudentCard";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import axios from "axios";
import NoDataFound from "./NoDataFound";
import ShowStudentsButton from "./ShowStudentsButton";
import AddStudentButton from "./AddStudentButton";
import AddTeacherButton from "./AddTeacherButton";
import ShowTeacherButton from "./ShowTeacherButton";
import TeacherCard from "./TeacherCard";

function Home() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Not being used
  const [loading, setLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState([]);
  const [teacherDetails, setTeacherDetails] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.post(
        "https://school-mgmt-api.vercel.app/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Check if the user is logged in based on your authentication mechanism
    const token = localStorage.getItem("token");
  }, []);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:3000/student/getStudent"
        );
        console.log(response.data.students);
        setStudentDetails(response.data.students);
        setLoading(false);
        dispatch(hideLoading());
      } catch (error) {
        console.error("Error fetching student details:", error);
        setLoading(false);
        dispatch(hideLoading());
      }
    };

    fetchStudentDetails();
  }, [dispatch]);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:3000/teacher/getTeacher"
        );
        console.log(response.data);
        setTeacherDetails(response.data);
        setLoading(false);
        dispatch(hideLoading());
      } catch (error) {
        console.error("Error fetching teacher details:", error);
        setLoading(false);
        dispatch(hideLoading());
      }
    };

    fetchTeacherDetails();
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {user?.isTeacher ? (
          <>
            <div className="flex">
              <AddStudentButton />
              <ShowStudentsButton />
            </div>
            <div className="flex">
              <AddTeacherButton />
              <ShowTeacherButton />
            </div>
          </>
        ) : (
          <div className="flex">
            <AddStudentButton />
            <ShowStudentsButton />
          </div>
        )}
      </div>
      <header className="text-gray text-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>

      {user?.isTeacher ? (
        <>
          <main className="container mx-auto mt-6 p-4">
            <h1 className="text-2xl font-semibold">Student Data</h1>
            {studentDetails.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.isArray(studentDetails) && studentDetails.length > 0 ? (
                  studentDetails.map((student, index) => (
                    <StudentCard student={student} key={index} />
                  ))
                ) : (
                  <p>No Data found</p>
                )}
              </div>
            )}
          </main>
          <main className="container mx-auto mt-6 p-4">
            <h1 className="text-2xl font-semibold">Teacher Data</h1>
            {teacherDetails?.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.isArray(teacherDetails) && teacherDetails.length > 0 ? (
                  teacherDetails.map((teacher, index) => (
                    <TeacherCard teacher={teacher} key={index} />
                  ))
                ) : (
                  <p>No Data found</p>
                )}
              </div>
            )}
          </main>
        </>
      ) : (
        <>
          <main className="container mx-auto mt-6 p-4">
            <h1 className="text-2xl font-semibold">Student Data</h1>
            {studentDetails.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.isArray(studentDetails) && studentDetails.length > 0 ? (
                  studentDetails.map((student, index) => (
                    <StudentCard student={student} key={index} />
                  ))
                ) : (
                  <p>No Data found</p>
                )}
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
}

export default Home;
