import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import Slider from "react-slick"; // Importing Slider from react-slick for the carousel (though not used in this component).
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Register the necessary Chart.js components for the Pie chart.
ChartJS.register(Title, ArcElement, ChartTooltip, Legend);

// Main Home component for displaying attendance information.
function Home() {
  const [daysOff, setDaysOff] = useState(13); // State to track the number of days off (absent).
  const [thisWeek, setThisWeek] = useState([]); // State to store attendance data for the current week.

  // Function to fetch attendance data from the backend and update the state.
  const getAttendance = async () => {
    let student = JSON.parse(localStorage.getItem("student")); // Retrieve the student data from local storage.
    
    // Fetch attendance data from the server using POST request with student ID.
    const res = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }), // Sending the student ID in the request body.
    });
    
    const data = await res.json(); // Parsing the response to JSON format.
    
    // Check if the response is successful.
    if (data.success) {
      let daysOff = 12; // Initialize daysOff to 12.
      let thisWeek = []; // Initialize an empty array for this week's attendance data.

      // Iterate over the fetched attendance data.
      data.attendance.map((day) => {
        // Increment daysOff if the student was absent.
        if (day.status === "absent") {
          daysOff++;
        }

        // Check if the attendance date is within the last 7 days.
        if (new Date(day.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
          // Add the attendance details to the thisWeek array.
          thisWeek.push({
            weekdate: new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), // Format the date.
            weekday: new Date(day.date).toLocaleDateString('en-PK', { weekday: "long" }), // Format the weekday.
            present: day.status === "present" // Check if the student was present on that day.
          });
        }
      });

      setDaysOff(daysOff); // Update the daysOff state.
      setThisWeek(thisWeek); // Update the thisWeek state.
    } else {
      console.log("Error"); // Log an error if the data fetch was unsuccessful.
    }
  };

  // useEffect hook to fetch attendance data when the component mounts.
  useEffect(() => {
    getAttendance();
  }, []);

  // Calculate the total days in the current month.
  let totalDays = new Date();
  totalDays = totalDays.getDate(); // Get the current date, representing total days.

  const labels = ["Days off", "Days present"]; // Labels for the Pie chart.

  return (
    // Main container of the Home component.
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center max-h-screen overflow-y-auto pt-20 md:pt-0">
      
      {/* Display total, present, and absent days in a list. */}
      <ul className="flex gap-5 text-white text-xl px-5 sm:p-0 text-center">
        <li>Total Days: {totalDays}</li>
        <li>Present Days: {totalDays - daysOff}</li>
        <li>Absent Days: {daysOff}</li>
      </ul>
      
      {/* Flex container for the Pie chart and weekly attendance overview cards. */}
      <div className="flex gap-5 flex-wrap max-h-96 justify-center items-center">
        
        {/* Card displaying the Pie chart of attendance data. */}
        <div className="w-full max-w-xs mx-5 sm:m-0 sm:w-80 bg-gray-800 rounded-lg shadow-xl p-5 transform transition-transform duration-300 hover:scale-110">
          <Pie
            data={{
              labels, // Labels defined earlier: Days off and Days present.
              datasets: [
                {
                  label: "Attendance", // Title of the dataset.
                  data: [daysOff, totalDays - daysOff], // Data values for the Pie chart.
                  backgroundColor: ["#F26916", "#1D4ED8"], // Colors for the Pie slices.
                  borderColor: "rgba(0,0,0,0)", // Transparent border.
                  borderWidth: 1, // Border width.
                },
              ],
            }}
            options={{
              responsive: true, // Makes the chart responsive.
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const value = tooltipItem.raw; // Access the raw value of the tooltip item.
                      return ` ${labels[tooltipItem.dataIndex]}: ${value} days`; // Custom label for the tooltip.
                    },
                  },
                },
                legend: {
                  display: true, // Display the legend.
                  position: 'bottom', // Position the legend at the bottom.
                },
                animation: {
                  animateRotate: true, // Enables rotation animation.
                  animateScale: true, // Enables scaling animation.
                },
              },
            }}
          />
          <p className="text-white text-xl font-bold mt-4 text-center">Attendance Overview</p> {/* Pie chart title */}
        </div>

        {/* Card displaying attendance details for the current week. */}
        <div className="flow-root bg-gray-800 rounded-lg shadow-xl w-full mx-5 sm:m-0 sm:w-80 p-5 transform transition-transform duration-300 hover:scale-110">
          <p className="text-white text-xl font-bold">This Week</p>
          <ul role="list" className="divide-y divide-gray-700">
            {/* Map through thisWeek array and display each day's attendance status. */}
            {thisWeek.map((day) => (
              <li className="py-3 sm:py-4 hover:bg-gray-700 transition-colors duration-300 rounded-lg" key={day.weekdate}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {day.weekday} -- {day.weekdate} {/* Display formatted weekday and date */}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                      {day.present ? "Present" : "Absent"} {/* Display if the student was present or absent */}
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-base font-semibold text-white">
                    {/* Display a checkmark icon if present, otherwise display a cross icon. */}
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
