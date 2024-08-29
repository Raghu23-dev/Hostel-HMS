import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";

export default function AdminSignIn() {
  let navigate = useNavigate();
  
  const getHostel = async () => {
    let admin = JSON.parse(localStorage.getItem("admin"));
    try {
      const res = await fetch("http://localhost:3000/api/admin/get-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: admin._id })
      });

      const data = await res.json();
      console.log(data);
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (err) {
      console.log(err);
    }
  };

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: inputEmail,
      password: pass,
    };

    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.data.token);
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

      let adminResult = await admin.json();
      console.log(adminResult);
      if (adminResult.success) {
        localStorage.setItem("admin", JSON.stringify(adminResult.admin));
        const hostel = await getHostel();
        navigate("/admin-dashboard");
      } else {
        toast.error(
          adminResult.errors[0].msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } else {
      toast.error(
        result.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [pass, setPass] = useState("");

  const changeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  return (
    <div className="w-full max-w-md h-[600px] rounded-lg bg-gray-800 border-gray-700 transition-transform transform hover:scale-105 mt-20">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h3 className="text-l font-bold leading-tight tracking-tight md:text-lg text-blue-700">
          Welcome back
        </h3>
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account as <span className="text-green-600">Manager</span>
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={inputEmail}
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
        </form>
      </div>
    </div>
  );
}
