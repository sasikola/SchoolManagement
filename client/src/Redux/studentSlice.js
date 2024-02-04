import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [],
  },
  reducers: {
    getStudent: (state, action) => {
      state.student = action.payload.map((student) => {
        return {
          id: student._id,
          name: student.name,
          age: student.age,
          grade: student.grade
        };
      });
    },
    addStudent: (state, action) => {
      state.student.push(action.payload);
    },
    updatedStudent: (state, action) => {
      const index = state.student.findIndex((x) => x.id === action.payload.id);
      state.student[index] = {
        id: action.payload.id,
        name: action.payload.name,
        age: action.payload.age,
        grade: action.payload.grade,
      };
    },
    deleteStudent: (state, action) => {
      const id = action.payload.id;
      state.student = state.student.filter((u) => u.id !== id);
    },
  },
});

export const { getStudent, addStudent, updatedStudent, deleteStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
