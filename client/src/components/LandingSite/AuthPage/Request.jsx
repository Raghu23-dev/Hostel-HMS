import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RequestAcc() {
  const [inputCms, setInputCms] = useState("");
  const changeCms = (event) => {
    setInputCms(event.target.value);
  };

  const cms = {
    name: "cms",
    type: "number",
    placeholder: "Enter your CMS ID",
    req: true,
    onChange: changeCms,
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Request Account from Hostel Manager
        </h1>
        <form className="space-y-6">
          <Input field={cms} />
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Request
          </button>
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/auth" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
