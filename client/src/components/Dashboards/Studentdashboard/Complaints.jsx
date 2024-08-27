import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";

function Complaints() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Electric");

  const types = ["Electric", "Furniture", "Cleaning", "Others"];

  function chngType(e) {
    setType(e.target.value);
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function descChange(e) {
    setDesc(e.target.value);
  }

  const complaintTitle = {
    name: "Complaint title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  const complaintType = {
    name: "complaint type",
    placeholder: "Type...",
    req: true,
    type: "text",
    value: type,
    onChange: chngType,
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <form
        method="POST"
        action="#"
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4 transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <div className="relative">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Complaint type
          </label>
          <select
            id="type"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={chngType}
            value={type}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {type.toLowerCase() === 'others' && (
            <div className="mt-4">
              <Input field={complaintType} />
            </div>
          )}
        </div>
        <Input field={complaintTitle} />
        <div className="relative">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Please describe your complaints"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-3 resize-none focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={descChange}
            value={desc}
            rows={3}  // Reduced rows for a shorter height
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transform transition-transform hover:scale-105"
        >
          Register Complaint
        </button>
      </form>
    </div>
  );
}

export default Complaints;
