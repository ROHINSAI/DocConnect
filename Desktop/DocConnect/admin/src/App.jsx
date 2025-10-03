import { useContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
function App() {
  const { atoken } = useContext(AdminContext);

  return atoken ? (
    <div className="bg-[#FF9FD]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            path="/admin-dashboard"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path="/all-appointments"
            element={
              <>
                <AllAppointments />
              </>
            }
          />
          <Route
            path="/add-doctor"
            element={
              <>
                <AddDoctor />
              </>
            }
          />
          <Route
            path="/doctor-list"
            element={
              <>
                <DoctorsList />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
