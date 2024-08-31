import { Input } from "./Input"; // Import the Input component
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate hooks from react-router-dom
import { useState } from "react"; // Import useState hook from React
import { verifysession } from "../../../utils/"; // Import verifysession function from utils
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Loader } from "../../Dashboards/Common/Loader"; // Import Loader component

export default function SignIn() {
  // Initialize navigation hook
  const navigate = useNavigate();
  
  // State variables for email, password, and loader
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  // Check if a token exists in local storage
  if (localStorage.getItem("token")) {
    verifysession(); // Verify session if token is present
  }

  // Function to handle login form submission
  const login = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoader(true); // Show loader during login process

    const data = {
      email: email,
      password: pass,
    };

    try {
      // Make a POST request to the login API
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Store the token in local storage if login is successful
        localStorage.setItem("token", result.data.token);

        // Fetch student details after successful login
        const studentResponse = await fetch(
          "http://localhost:3000/api/student/get-student",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isAdmin: result.data.user.isAdmin,
              token: result.data.token,
            }),
          }
        );

        const studentResult = await studentResponse.json();

        if (studentResult.success) {
          // Store student details in local storage
          localStorage.setItem("student", JSON.stringify(studentResult.student));
          navigate("/student-dashboard"); // Navigate to the student dashboard
        } else {
          console.error(studentResult.errors); // Log errors if fetching student details fails
        }
      } else {
        // Show error notification if login fails
        toast.error(result.errors[0].msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      // Show error notification if an exception occurs
      console.error("An error occurred during login:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoader(false); // Hide loader when the login process is complete
    }
  };

  // Functions to handle changes in email and password input fields
  const changeEmail = (event) => setEmail(event.target.value);
  const changePass = (event) => setPass(event.target.value);

  return (
    <>
      {/* Sign-In form container */}
      <div className="w-full max-w-md h-[600px] rounded-lg bg-gray-800 border-gray-700 transition-transform transform hover:scale-105 mt-20">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* Heading */}
          <h3 className="text-l font-bold leading-tight tracking-tight md:text-lg text-blue-700">
            Welcome back
          </h3>
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Sign in to your account as{" "}
            <span className="text-orange-500">Student</span>
          </h1>

          {/* Sign-In form */}
          <form className="space-y-4 md:space-y-6" onSubmit={login}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={changeEmail}
              className="w-full p-2.5 text-sm rounded-lg border-gray-600 bg-gray-700 border focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white transition-transform transform hover:scale-105"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={changePass}
              className="w-full p-2.5 text-sm rounded-lg border-gray-600 bg-gray-700 border focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white transition-transform transform hover:scale-105"
            />

            {/* Submit button */}
            <button
              type="submit"
              className="w-full text-white hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800 transition-transform transform hover:scale-105"
            >
              {loader ? (
                <>
                  <Loader /> Verifying...
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Toast container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
