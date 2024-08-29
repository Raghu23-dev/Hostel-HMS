import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Register the necessary Chart.js components
ChartJS.register(Title, ArcElement, ChartTooltip, Legend);

function Home() {
  const [daysOff, setDaysOff] = useState(13);
  const [thisWeek, setThisWeek] = useState([]);

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
      let thisWeek = [];
      data.attendance.map((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
        if (new Date(day.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
          thisWeek.push(
            { weekdate: new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), weekday: new Date(day.date).toLocaleDateString('en-PK', { weekday: "long" }), present: day.status === "present" }
          );
        }
      });
      setDaysOff(daysOff);
      setThisWeek(thisWeek);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  let totalDays = new Date();
  totalDays = totalDays.getDate();
  const labels = ["Days off", "Days present"];

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center max-h-screen overflow-y-auto pt-20 md:pt-0">
      <ul className="flex gap-5 text-white text-xl px-5 sm:p-0 text-center">
        <li>Total Days: {totalDays}</li>
        <li>Present Days: {totalDays - daysOff}</li>
        <li>Absent Days: {daysOff}</li>
      </ul>
      <div className="flex gap-5 flex-wrap max-h-96 justify-center items-center">
        <div className="w-full max-w-xs mx-5 sm:m-0 sm:w-80 bg-gray-800 rounded-lg shadow-xl p-5 transform transition-transform duration-300 hover:scale-105">
          <Pie
            data={{
              labels,
              datasets: [
                {
                  label: "Attendance",
                  data: [daysOff, totalDays - daysOff],
                  backgroundColor: ["#F26916", "#1D4ED8"],
                  borderColor: "rgba(0,0,0,0)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const value = tooltipItem.raw;
                      return ` ${labels[tooltipItem.dataIndex]}: ${value} days`;
                    },
                  },
                },
                legend: {
                  display: true,
                  position: 'bottom',
                },
                animation: {
                  animateRotate: true,
                  animateScale: true,
                },
              },
            }}
          />
          <p className="text-white text-xl font-bold mt-4 text-center">Attendance Overview</p>
        </div>
        <div className="flow-root bg-gray-800 rounded-lg shadow-xl w-full mx-5 sm:m-0 sm:w-80 p-5 transform transition-transform duration-300 hover:scale-105">
          <p className="text-white text-xl font-bold">This Week</p>
          <ul role="list" className="divide-y divide-gray-700">
            {thisWeek.map((day) => (
              <li className="py-3 sm:py-4 hover:bg-neutral-800 transition-colors duration-300" key={day.weekdate}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {day.weekday} -- {day.weekdate}
                    </p>
                    <p className="text-sm truncate text-gray-400">{day.present ? "Present" : "Absent"}</p>
                  </div>
                  <div className="flex flex-col items-center text-base font-semibold text-white">
                    {day.present ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
