import { useEffect, useState } from "react"; // Importing necessary hooks from React
import Slider from "react-slick"; // Importing the slider component from the react-slick library
import "slick-carousel/slick/slick.css"; // Importing the default CSS for the slick slider
import "slick-carousel/slick/slick-theme.css"; // Importing the theme CSS for the slick slider

function Home() {
  // Retrieve the student object from localStorage
  let student = JSON.parse(localStorage.getItem("student"));

  // Function to fetch attendance data
  const getAttendance = async () => {
    // Retrieve student details from localStorage again (potentially redundant)
    let student = JSON.parse(localStorage.getItem("student"));
    // Fetch attendance data from the server
    const res = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }), // Send student ID in the request body
    });
    const data = await res.json(); // Parse response as JSON
    if (data.success) {
      let daysOff = 0; // Initialize days off with a base value of 0
      // Count the number of absent days
      data.attendance.forEach((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
      });
      setDaysOff(daysOff); // Update state with the total days off
      console.log(daysOff); // Log the days off (for debugging)
    } else {
      console.log("Error"); // Log an error if the request was unsuccessful
    }
  };

  // useEffect to run the getAttendance function once the component mounts
  useEffect(() => {
    getAttendance();
  }, []);

  let totalDays = new Date().getDate(); // Calculate the total days of the current month
  const [daysOff, setDaysOff] = useState(0); // State to keep track of days off

  // Slider settings configuration
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
        {/* Carousel section for displaying images */}
        <div className="w-full max-w-sm p-3 rounded-lg shadow-lg bg-gray-800 transform transition-transform duration-300 hover:scale-110 overflow-hidden">
          <Slider {...settings}>
            <div className="relative">
              <img
                src="src/assets/notice.png" // Path to the first slide image
                alt="No Notices"
                className="w-full h-70 object-contain"
              />
            </div>
            <div className="relative">
              <img
                src="src/assets/announce.png" // Path to the second slide image
                alt="No Announcements"
                className="w-full h-61 object-contain"
              />
            </div>
          </Slider>
        </div>

        {/* Attendance information section */}
        <div className="flex flex-col items-center bg-gray-800 rounded-xl shadow-xl p-3 w-full max-w-sm transform transition-transform duration-300 hover:scale-110">
          <span className="text-white text-xl mb-3">Attendance</span>
          <div className="flex flex-col gap-3 w-full">
            {/* Total Days card */}
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 hover:scale-110">
              <h3 className="text-lg font-semibold">Total Days</h3>
              <p className="text-xl">{totalDays}</p>
            </div>
            {/* Days Present card */}
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 hover:scale-110">
              <h3 className="text-lg font-semibold">Days Present</h3>
              <p className="text-xl">{totalDays - daysOff}</p>
            </div>
            {/* Days Off card */}
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 hover:scale-110">
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
