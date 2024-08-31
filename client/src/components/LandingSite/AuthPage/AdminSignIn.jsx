import { useState } from "react"; // Import useState hook from React
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom for navigation
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { Loader } from "../../Dashboards/Common/Loader"; // Import Loader component

export default function AdminSignIn() {
  let navigate = useNavigate(); // Initialize navigate for programmatic navigation

  // Function to fetch and store the hostel data
  const getHostel = async () => {
    let admin = JSON.parse(localStorage.getItem("admin")); // Retrieve admin data from localStorage
    try {
      const res = await fetch("http://localhost:3000/api/admin/get-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: admin._id }) // Send admin ID in request body
      });

      const data = await res.json(); // Parse response JSON
      console.log(data);
      localStorage.setItem("hostel", JSON.stringify(data.hostel)); // Store hostel data in localStorage
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  // Function to handle login form submission
  let login = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoader(true); // Set loader to true to show loading indicator

    let data = {
      email: inputEmail, // Email from state
      password: pass, // Password from state
    };

    try {
      // Send login request
      let response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // Send email and password in request body
      });

      let result = await response.json(); // Parse response JSON

      if (result.success) {
        localStorage.setItem("token", result.data.token); // Store token in localStorage
        // Fetch admin details
        let admin = await fetch("http://localhost:3000/api/admin/get-admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAdmin: result.data.user.isAdmin,
            token: result.data.token
          })
        });

        let adminResult = await admin.json(); // Parse admin details response JSON
        console.log(adminResult);
        if (adminResult.success) {
          localStorage.setItem("admin", JSON.stringify(adminResult.admin)); // Store admin data in localStorage
          await getHostel(); // Fetch and store hostel data
          navigate("/admin-dashboard"); // Navigate to admin dashboard
        } else {
          toast.error(
            adminResult.errors[0].msg, { // Show error toast if fetching admin details fails
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
      } else {
        toast.error(
          result.errors[0].msg, { // Show error toast if login fails
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
    } catch (err) {
      console.log(err); // Log any errors during the login process
      toast.error("An unexpected error occurred.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoader(false); // Set loader to false to hide loading indicator
    }
  };

  // State to manage loader visibility, email, and password
  const [loader, setLoader] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [pass, setPass] = useState("");

  // Handlers for updating email and password state
  const changeEmail = (event) => setInputEmail(event.target.value);
  const changePass = (event) => setPass(event.target.value);

  return (
    <>
      {/* Container for sign-in form */}
      <div className="w-full max-w-md h-[600px] rounded-lg bg-gray-800 border-gray-700 transition-transform transform hover:scale-110 mt-20">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* Header texts */}
          <h3 className="text-l font-bold leading-tight tracking-tight md:text-lg text-blue-700">
            Welcome back
          </h3>
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Sign in to your account as <span className="text-green-600">Manager</span>
          </h1>
          {/* Sign-in form */}
          <form className="space-y-4 md:space-y-6" onSubmit={login}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={inputEmail}
              onChange={changeEmail}
              className="w-full p-2.5 text-sm rounded-lg border-gray-600 bg-gray-700 border focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white transition-transform transform hover:scale-110"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={changePass}
              className="w-full p-2.5 text-sm rounded-lg border-gray-600 bg-gray-700 border focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white transition-transform transform hover:scale-110"
            />
            <button
              type="submit"
              className="w-full text-white hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800 transition-transform transform hover:scale-110"
            >
              {/* Show Loader component and text when loader is true */}
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
      {/* ToastContainer for displaying notifications */}
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
