import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: [],
  },

  reducers: {
    getTeacher: (state, action) => {
      state.teacher = action.payload.map((teacher) => {
        return {
          id: teacher._id,
          name: teacher.name,
          subject: teacher.subject,
        };
      });
    },
    addTeacher: (state, action) => {
      state.teacher.push(action.payload);
    },
    updatedTeacher: (state, action) => {
      const index = state.teacher.findIndex((x) => x.id === action.payload.id);
      state.teacher[index] = {
        id: action.payload.id,
        name: action.payload.name,
        subject: action.payload.subject,
      };
    },
    deleteTeacher: (state, action) => {
      const id = action.payload.id;
      state.teacher = state.teacher.filter((u) => u.id !== id);
    },
  },
});

export const { getTeacher, addTeacher, updatedTeacher, deleteTeacher } =
  teacherSlice.actions;
export default teacherSlice.reducer;
