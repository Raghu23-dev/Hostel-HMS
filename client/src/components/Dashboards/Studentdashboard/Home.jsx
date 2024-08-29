import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  let student = JSON.parse(localStorage.getItem("student"));

  const getAttendance = async () => {
    let student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) {
      let daysOff = 12;
      data.attendance.forEach((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
      });
      setDaysOff(daysOff);
      console.log(daysOff);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  let totalDays = new Date().getDate();
  const [daysOff, setDaysOff] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5 max-h-screen overflow-y-auto pt-32 lg:pt-16 md:pt-24 sm:pt-40">
      <div className="flex gap-5 w-full justify-center flex-wrap">
        <div className="w-full max-w-sm p-3 rounded-lg shadow-lg bg-gray-800 transform transition-transform duration-300 hover:scale-105 overflow-hidden">
          <Slider {...settings}>
            <div className="relative ">
              <img
                src="src/assets/notice.png"
                alt="Slide 1"
                className="w-full h-70 object-contain"
              />
            </div>
            <div className="relative">
              <img
                src="src/assets/announce.png"
                alt="Slide 2"
                className="w-full h-61 object-contain"
              />
            </div>
          </Slider>
        </div>
        <div className="flex flex-col items-center bg-gray-800 rounded-xl shadow-xl p-3 w-full max-w-sm transform transition-transform duration-300 hover:scale-105">
          <span className="text-white text-xl mb-3">Attendance</span>
          <div className="flex flex-col gap-3 w-full">
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Total Days</h3>
              <p className="text-xl">{totalDays}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Days Present</h3>
              <p className="text-xl">{totalDays - daysOff}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Days Off</h3>
              <p className="text-xl">{daysOff}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;