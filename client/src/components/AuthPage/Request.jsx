import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RequestAcc() {
  const [inputCms, setInputCms] = useState("");
  
  const handleInputChange = (event) => setInputCms(event.target.value);

  const cmsField = {
    name: "CMS",
    type: "number",
    placeholder: "000000",
    req: true,
    onChange: handleInputChange,
  };

  return (
    <div className="w-full rounded-lg sm:max-w-md bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Request an account from Hostel Manager
        </h1>
        <form className="space-y-4">
          <Input field={cmsField} />
          <button
            type="submit"
            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Request
          </button>
          <p className="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <Link to="/auth" className="font-medium text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
