import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
  // Function to fetch complaints from the server
  const getComplaints = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))?._id;

    // Fetch complaints based on hostel ID
    const response = await fetch(`http://localhost:3000/api/complaint/hostel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel }),
    });

    const data = await response.json();
    
    // If successful, process and set complaints data
    if (data.success) {
      const complaints = data.complaints.map((complaint) => {
        let date = new Date(complaint.date);
        return {
          id: complaint._id,
          type: complaint.type,
          title: complaint.title,
          desc: complaint.description,
          student: complaint.student?.name || "Unknown",
          room: complaint.student?.room_no || "N/A",
          status: complaint.status,
          date: date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        };
      });

      setAllComplaints(complaints);

      // Set resolved and unresolved complaints
      const resolved = complaints.filter(
        (complaint) => complaint.status.toLowerCase() !== "pending"
      );
      setResolvedComplaints(resolved);

      setComplaints(
        complaints.filter(
          (complaint) => complaint.status.toLowerCase() === "pending"
        )
      );
    } else {
      console.log(data);
    }
  };

  // State variables for complaints
  const [unsolvedComplaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);

  // Function to mark a complaint as resolved
  const dismissComplaint = async (id) => {
    const response = await fetch(
      "http://localhost:3000/api/complaint/resolve/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();

    if (data.success) {
      // Show success toast notification
      toast.success("Complaint Dismissed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      // Update state to reflect dismissed complaint
      setComplaints(allComplaints.filter((complaint) => complaint.id !== id));
      setResolvedComplaints(
        resolvedComplaints.concat(
          allComplaints.filter((complaint) => complaint.id === id)
        )
      );
    } else {
      // Show error toast notification
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // State variable for graph data
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getComplaints();

    // Prepare date labels for the graph
    const dates = [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now()).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    ];

    const labels = dates.map((date) => date);
    
    // Set graph data based on the number of complaints per date
    setGraphData(
      labels.map(
        (date) =>
          allComplaints.filter((complaint) => complaint.date === date).length
      )
    );
  }, [allComplaints]);

  // Chart component for displaying complaints over time
  const graph = (
    <div className="flex items-center justify-center md:h-64 h-40 md:w-96 w-full transition-transform transform hover:scale-110">
      <Line
        data={{
          labels: [
            new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now()).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          ],
          datasets: [
            {
              label: "No. of Complaints",
              pointHoverBackgroundColor: "orange",
              data: graphData,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-10 md:gap-7 pt-32 items-center justify-center overflow-auto">
      <div className="flex md:gap-7 flex-wrap justify-center items-center gap-7 ">
        {graph}
        <div className="bg-gray-800 px-10 py-5 rounded-xl shadow-xl w-96 max-h-64 overflow-auto  transition-transform transform hover:scale-110">
          <span className="text-white font-bold text-xl flex justify-center">New Complaints</span>
          <ul role="list" className="divide-y divide-gray-700 text-white">
            {unsolvedComplaints.length === 0
              ? "No new complaints!"
              : unsolvedComplaints.map((complaint) => (
                  <li
                    className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-110 transition-all"
                    key={complaint.id} // Unique key for list item
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-white">
                          {complaint.title}
                        </p>
                        <p className="text-sm truncate text-gray-400">
                          {complaint.desc}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-white">
                        <button
                          onClick={() => dismissComplaint(complaint.id)}
                          className="bg-blue-600 px-5 py-1 rounded-lg hover:bg-blue-700 hover:scale-110 transition-all"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Complaints;
