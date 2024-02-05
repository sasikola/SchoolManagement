import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Navbar from "./components/Navbar";
import CreateStudent from "./Pages/CreateStudent";
import Student from "./Pages/Student";
import UpdateStudent from "./Pages/UpdateStudent";
import Teacher from "./Pages/Teacher";
import UpdateTeacher from "./Pages/UpdateTeacher";
import CreateTeacher from "./Pages/CreateTeacher";

function App() {
  const loading = useSelector((state) => state.alerts.loading);
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Router>
        {loading && (
          <div className="spinner-parent flex-col gap-4">
            <div className="w-16 h-16 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
          </div>
        )}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />

        

          <Route
            path="/createStudent"
            element={
              <ProtectedRoutes>
                <CreateStudent />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/createTeacher"
            element={
              <ProtectedRoutes>
                <CreateTeacher />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoutes>
                <Student />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoutes>
                <Teacher />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoutes>
                <UpdateStudent />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editTeacher/:id"
            element={
              <ProtectedRoutes>
                <UpdateTeacher />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
