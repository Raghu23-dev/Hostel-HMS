import { ShortCard } from "./ShortCard";
import { useState } from "react";

import hmsVideo from "../../../../assets/HMS.mp4";  
function Home() {
  // Initialize state for statistics
  const [totalStudents, setTotalStudents] = useState(26);
  const [totalComplaints, setTotalComplaints] = useState(2);
  const [totalSuggestions, setTotalSuggestions] = useState(70);
  const [totalRooms, setTotalRooms] = useState(14);
  const [roomsOccupied, setRoomsOccupied] = useState(11);

  const updateStats = () => {
    setTotalStudents(30); 
    setTotalComplaints(5); 
    setTotalSuggestions(13); 
    setTotalRooms(15); 
    setRoomsOccupied(12); 
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center text-white">
      {/* Stats Cards */}
      <div className="w-full px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
        <ShortCard number={""} title={ <video
          src={hmsVideo}
          className="h-16 w-40 object-cover scale-125 "
          autoPlay
          loop
          muted
        /> }/>
       
      <ShortCard title="Total Rooms" number={totalRooms} />
      <ShortCard title="Rooms Occupied" number={roomsOccupied} />
        <ShortCard title="Total Students" number={totalStudents} />
        <ShortCard title="Total Complaints" number={totalComplaints} />
        <ShortCard title="Total Suggestions" number={totalSuggestions} />
      </div>

      {/* Example button to update stats */}
      <button 
        onClick={updateStats} 
        className="px-4 py-2 transition-transform transform hover:scale-110  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg "
      >
        Refresh
      </button>
    </div>
  );
}

export default Home;
