import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminSignIn() {
  const [inputId, setInputId] = useState("");
  const [pass, setPass] = useState("");

  const changeCms = (event) => {
    setInputId(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const id = {
    name: "id",
    type: "number",
    placeholder: "Enter your ID",
    req: true,
    onChange: changeCms,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    req: true,
    onChange: changePass,
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Manager Sign In
        </h1>
        <form className="space-y-6">
          <Input field={id} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
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
            You're a student?{" "}
            <Link to="/auth/login" className="text-blue-400 hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
