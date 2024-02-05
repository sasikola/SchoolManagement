import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";
import studentReducer from "./studentSlice";
import TeacherReducer from "./teacherSlice";

const store = configureStore({
  reducer: {
    alerts: alertReducer,
    user: userReducer,
    student: studentReducer,
    teacher: TeacherReducer,
  },
});

export default store;
