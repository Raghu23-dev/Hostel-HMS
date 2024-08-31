import { ShortCard } from "./ShortCard"; // Importing the ShortCard component
import { useState } from "react"; // Importing useState hook from React

import hmsVideo from "../../../../assets/HMS.mp4"; // Importing a video file for the stats card

function Home() {
  // Initialize state variables for statistics with their default values
  const [totalStudents, setTotalStudents] = useState(26);
  const [totalComplaints, setTotalComplaints] = useState(2);
  const [totalSuggestions, setTotalSuggestions] = useState(70);
  const [totalRooms, setTotalRooms] = useState(14);
  const [roomsOccupied, setRoomsOccupied] = useState(11);

  // Function to update statistics values
  const updateStats = () => {
    setTotalStudents(30); 
    setTotalComplaints(5); 
    setTotalSuggestions(13); 
    setTotalRooms(15); 
    setRoomsOccupied(12); 
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center text-white">
      {/* Container for statistics cards */}
      <div className="w-full px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* ShortCard with a video displaying an asset */}
        <ShortCard 
          number={""} 
          title={
            <video
              src={hmsVideo}
              className="h-16 w-40 object-cover scale-125"
              autoPlay
              loop
              muted
            />
          }
        />
       
        {/* ShortCard components displaying various statistics */}
        <ShortCard title="Total Rooms" number={totalRooms} />
        <ShortCard title="Rooms Occupied" number={roomsOccupied} />
        <ShortCard title="Total Students" number={totalStudents} />
        <ShortCard title="Total Complaints" number={totalComplaints} />
        <ShortCard title="Total Suggestions" number={totalSuggestions} />
      </div>

      {/* Button to trigger the updateStats function */}
      <button 
        onClick={updateStats} 
        className="px-4 py-2 transition-transform transform hover:scale-110 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg"
      >
        Refresh
      </button>
    </div>
  );
}

export default Home;
