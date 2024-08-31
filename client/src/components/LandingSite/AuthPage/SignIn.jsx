import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  // Check session if token exists
  if (localStorage.getItem("token")) {
    verifysession();
  }

  // Login function to handle form submission
  const login = async (event) => {
    event.preventDefault();
    setLoader(true);

    const data = {
      email: email,
      password: pass,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.data.token);

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
          localStorage.setItem(
            "student",
            JSON.stringify(studentResult.student)
          );
          navigate("/student-dashboard");
        } else {
          console.error(studentResult.errors);
        }
      } else {
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
      console.error("An error occurred during login:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoader(false);
    }
  };

  // Handle changes in email and password inputs
  const changeEmail = (event) => setEmail(event.target.value);
  const changePass = (event) => setPass(event.target.value);

  return (
    <>
      <div className="w-full max-w-md h-[600px] rounded-lg bg-gray-800 border-gray-700 transition-transform transform hover:scale-105 mt-20">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h3 className="text-l font-bold leading-tight tracking-tight md:text-lg text-blue-700">
            Welcome back
          </h3>
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Sign in to your account as{" "}
            <span className="text-orange-500">Student</span>
          </h1>

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
