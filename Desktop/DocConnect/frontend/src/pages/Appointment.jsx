import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RealtedDoctors from "../components/RealtedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
function Appointment() {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    getDoctorsData,
    token,
    userData,
  } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = () => {
    if (!docInfo || !docInfo.slotsbooked) {
      return;
    }

    const allSlots = [];
    const today = new Date();

    let startOffset = 0;

    const tempToday = new Date(today);
    const endTimeToday = new Date(today);
    endTimeToday.setHours(21, 0, 0, 0);

    tempToday.setHours(
      new Date().getHours() > 10 ? new Date().getHours() + 1 : 10
    );
    tempToday.setMinutes(new Date().getMinutes() > 30 ? 30 : 0);

    if (tempToday >= endTimeToday) {
      startOffset = 1;
    }

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i + startOffset);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        if (startOffset === 0) {
          const now = new Date();
          currentDate.setHours(now.getHours() > 10 ? now.getHours() + 1 : 10);
          currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10, 0, 0, 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotdate = day + "_" + month + "_" + year;
        const slottime = formattedTime;

        const isSlotAvailable =
          docInfo.slotsbooked[slotdate] &&
          docInfo.slotsbooked[slotdate].includes(slottime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);

    const firstAvailableDayIndex = allSlots.findIndex((day) => day.length > 0);
    if (firstAvailableDayIndex !== -1) {
      setSlotIndex(firstAvailableDayIndex);

      if (allSlots[firstAvailableDayIndex].length > 0) {
        setSlotTime(allSlots[firstAvailableDayIndex][0].time);
      }
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      return;
    }

    if (!slotTime) {
      toast.error("Please select a time slot before booking");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { userId: userData._id, docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc);
      setIsLoading(false);
    }
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (isLoading) {
    return <div>Loading doctor's details...</div>;
  }

  if (!docInfo) {
    return <div>Sorry, the doctor you are looking for could not be found.</div>;
  }

  return (
    docInfo && (
      <div>
        {/* doctors details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* docInfo like name, degree and experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-600 text-md max-w-[700px] mt-5">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, idx) => (
                <div
                  onClick={() => setSlotIndex(idx)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === idx
                      ? "bg-[#5f6FFF] text-white"
                      : "border border-gray-200"
                  }`}
                  key={idx}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((items, idx) => (
                <p
                  onClick={() => {
                    setSlotTime(items.time);
                  }}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    items.time === slotTime
                      ? "text-white bg-[#5f6FFF]"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={idx}
                >
                  {items.time.toLowerCase()}
                </p>
              ))}
          </div>
          <div>
            <button
              onClick={bookAppointment}
              className="bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full mt-6"
            >
              Book an Appointment
            </button>
          </div>
          <RealtedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
}

export default Appointment;
