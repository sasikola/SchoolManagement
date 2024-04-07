import axios from 'axios';
import { useEffect, useState } from 'react';

const TeacherList = () => {
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get('https://school-mgmt-api.vercel.app/teacher/getTeacher');
        setTeacherDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student details:', error);
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <div className="mx-auto max-w-md bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Teacher Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Array.isArray(teacherDetails) && teacherDetails.length > 0 ? (
            teacherDetails.map((teacher) => (
              <li key={teacher._id} className="mb-2">
                <strong>Name:</strong> {teacher.name}, <strong>Subject:</strong> {teacher.subject}
              </li>
            ))
          ) : (
            <p>No teacher details available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TeacherList;
