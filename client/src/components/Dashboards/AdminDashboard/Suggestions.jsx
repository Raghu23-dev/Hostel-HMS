import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

function Suggestions() {
  // Function to fetch suggestions from the server
  const getSuggestions = async () => {
    // Retrieve hostel info from local storage
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    
    // Send a POST request to fetch suggestions for the hostel
    const response = await fetch("http://localhost:3000/api/suggestion/hostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });

    // Parse the response
    const data = await response.json();
    console.log(data);

    if (data.success) {
      // Filter and set suggestions with 'pending' status
      setSuggestions(data.suggestions.filter((suggestion) => suggestion.status === "pending"));
    } else {
      // Show error toast if fetching suggestions fails
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  // Function to update the status of a suggestion
  const updateSuggestion = async (id) => {
    setLoader(true); // Show loader while processing
    console.log(id);
    
    // Send a POST request to update the suggestion status
    const response = await fetch("http://localhost:3000/api/suggestion/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "approved" }),
    });

    // Parse the response
    const data = await response.json();
    console.log(data);

    if (data.success) {
      // Show success toast and refresh suggestions
      toast.success("Suggestion Approved", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      getSuggestions(); // Refresh suggestions
    } else {
      // Show error toast if updating suggestion fails
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    setLoader(false); // Hide loader
  };

  // State variables
  const [loader, setLoader] = useState(false); // Manage loading state
  const [suggestions, setSuggestions] = useState([]); // Store fetched suggestions
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [modalData, setModalData] = useState(null); // Store data for the modal

  // Toggle the visibility of the modal
  const toggleModal = (suggestion = {}) => {
    setModalData(suggestion);
    setShowModal((showModal) => !showModal);
  };

  // Fetch suggestions when the component mounts
  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      {/* Suggestions container */}
      <div className="bg-gray-800 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[450px] w-full mt-5 max-h-96 overflow-auto transition-transform transform hover:scale-110">
        <span className="text-white font-bold text-xl flex justify-center mb-3">
          Suggestions from all Students
        </span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {suggestions.length === 0
            ? "No Students Suggestion Found"  // Display message if no suggestions
            : suggestions.map((suggestion) => (
              <>
                {/* Render modal if it is visible */}
                {showModal && (
                  <Modal closeModal={toggleModal} suggestion={modalData} />
                )}
                <li
                  className="py-3 px-5 rounded sm:py-4 hover:bg-gray-700 hover:shadow-xl hover:scale-110 transition-all cursor-pointer rounded-lg"
                  key={suggestion._id}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon for the suggestion */}
                    <div className="flex-shrink-0 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:scale-125 hover:text-yellow-500 transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        {suggestion.title}
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        {suggestion.description}
                      </p>
                    </div>
                    {/* Button to update suggestion status */}
                    <button className="group/show relative z-0"
                      onClick={() => updateSuggestion(suggestion._id)}
                    >
                      {
                        loader ? 
                          <Loader />: // Show loader if processing
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:text-green-600 hover:scale-125 transition-all"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                            />
                          </svg>
                      }
                      <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">
                        Acknowledge.
                      </span>
                    </button>
                  </div>
                </li>
              </>
            ))}
        </ul>
      </div>

      {/* ToastContainer to display notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Suggestions;
