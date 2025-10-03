import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function AllAppointments() {
  const { atoken, appointments, getAllAppointments } = useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-xl font-medium">AllAppointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient name</p>
          <p>Age:</p>
          <p>Date & Time</p>
          <p>Doctor Name:</p>
          <p>Fees</p>
          <p>Actions:</p>
        </div>
        {appointments.map((item, index) => (
          <div></div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
