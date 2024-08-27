import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminSignIn() {
  const [inputId, setInputId] = useState("");
  const [pass, setPass] = useState("");

  const handleInputChange = (event) => setInputId(event.target.value);
  const handlePassChange = (event) => setPass(event.target.value);

  const idField = {
    name: "ID",
    type: "number",
    placeholder: "000000",
    req: true,
    onChange: handleInputChange,
  };

  const passwordField = {
    name: "Password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: handlePassChange,
  };

  return (
    <div className="w-full rounded-lg sm:max-w-md bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Sign in to your account - Manager
        </h1>
        <form className="space-y-4">
          <Input field={idField} />
          <Input field={passwordField} />
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
              required=""
            />
            <label className="ml-2 text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-400">
            You're a student?{" "}
            <Link to="/auth/login" className="font-medium text-blue-500 hover:underline">
              SignIn Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
