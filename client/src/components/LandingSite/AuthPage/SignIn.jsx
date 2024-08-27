import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  let navigate = useNavigate();
  
  let login = async (event) => {
    event.preventDefault();
    let data = {
      email: email,
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
      localStorage.setItem("user", JSON.stringify(result.data.user));
      navigate("/student-dashboard");
    } else {
      alert(result.errors[0].msg);
    }
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const iemail = {
    name: "email",
    type: "email",
    placeholder: "abc@gmail.com",
    req: true,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Sign in to your account
        </h1>
        <form className="space-y-6" onSubmit={login}>
          <Input field={iemail} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 focus:ring-blue-500 text-blue-500"
              />
              <span>Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Sign in
          </button>
          <p className="text-center text-sm text-gray-400">
            Don’t have an account yet?{" "}
            <Link to="request" className="text-blue-400 hover:underline">
              Request an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
