import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllStudents() {
  const [allStudents, setallStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getCSV = async () => {
    const hostel = JSON.parse(localStorage.getItem('hostel'))._id;
    const res = await fetch("http://localhost:3000/api/student/csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      const link = document.createElement('a');
      link.href = "data:text/csv;charset=utf-8," + escape(data.csv);
      link.download = 'students.csv';
      link.click();
      toast.success(
        'CSV Downloaded Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(
        data.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  };

  const getAll = async () => {
    const data = await getAllStudents();
    setallStudents(data.students);
  };

  const deleteStudent = async (id) => {
    const res = await fetch("http://localhost:3000/api/student/delete-student", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setallStudents(allStudents.filter((student) => student._id !== id));
      toast.success(
        'Student Deleted Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(
        data.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  // Filter students based on search query
  const filteredStudents = allStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="w-3/4 fixed top-20 left-50 right-50 bg-gray-800 shadow-md z-10 p-4 flex justify-between items-center transition-transform transform hover:scale-110 rounded-lg">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-10 px-5 py-3 border-none bg-gray-700 rounded-lg transition-transform transform hover:scale-110 w-3/4 text-white"
        />
        <button
          onClick={getCSV}
          target="_blank"
          download={true}
          className="px-2 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xl transition-transform transform hover:scale-110 "
        >
          Download Full list
        </button>
      </div>
      <div className="pt-20  w-full h-full overflow-auto m-20 ">
        <div className=" px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mx-auto mt-5 max-h-[calc(100vh-140px)] overflow-auto transition-transform transform hover:scale-110 bg-gray-800 ">
          <ul role="list" className="divide-y divide-gray-700 text-white">
            {filteredStudents.length === 0 ?
              "No Students Found"
            :
            filteredStudents.map((student) => (
              <li className="py-3 px-5   sm:py-4 hover:bg-gray-700 hover:scale-110 transition-all rounded-lg" key={student._id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-white">
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {student.name}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                      Student ID: {student.cms_id} | Room: {student.room_no}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="hover:underline hover:text-red-500 hover:scale-125 transition-all" onClick={() => deleteStudent(student._id)}>
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
        theme="dark"/>
    </div>
  );
}

export default AllStudents;
