import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [inputCms, setInputCms] = useState("");
  const [pass, setPass] = useState("");

  const changeCms = (event) => {
    setInputCms(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };
  const [position, setPosition] = useState("");

  const changePosition = (event) => {
    setPosition(event.target.value);
  };

  const cms = {
    name: "CMS",
    type: "number",
    placeholder: "000000",
    req: true,
    onChange: changeCms,
  };
  const password = {
    name: "Password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <div className="w-full rounded-lg sm:max-w-md bg-gray-800 border-gray-700">
      <div className="p-4 space-y-3">
        <h1 className="text-lg font-bold text-white">
          Sign in to your account
        </h1>
        <form className="space-y-3" action="#">
          <Input field={cms} />
          <Input field={password} />
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="radio"
                value="student"
                name="student-manager"
                className="w-4 h-4 bg-gray-800 border-gray-600"
                checked={position === "student"}
                onChange={changePosition}
              />
              <label className="ml-2 text-sm text-gray-300">Student</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="manager"
                name="student-manager"
                className="w-4 h-4 bg-gray-800 border-gray-600"
                checked={position === "manager"}
                onChange={changePosition}
              />
              <label className="ml-2 text-sm text-gray-300">Manager</label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 bg-gray-700 border-gray-600"
              required=""
            />
            <label htmlFor="remember" className="text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-4 py-2"
          >
            Sign in
          </button>
          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="request" className="text-blue-500 hover:underline">
              Request an account.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
