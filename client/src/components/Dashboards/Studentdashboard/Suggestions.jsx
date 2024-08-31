import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from 'emailjs-com'; // Import emailjs

function Suggestions() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Function to send email
  const sendEmail = () => {
    const templateParams = {
      from_name: 'HMS SMS Team', // Replace with dynamic data if needed
      to_name: 'Manager',
      message: `Hello Manager,

You got a new Suggestion: "${title}". Please Acknowledge.

Regards,
HMS SMS Team`,
    };

    emailjs.send('service_5q11fqs', 'template_6mbel6a', templateParams, 'dW61nSCuXlmi55Rng')
      .then((response) => {
        console.log('Email sent successfully:', response);
        toast.success('Email sent successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error('Failed to send email.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      });
  };

  // Function to register suggestion
  const registerSuggestions = async (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    const response = await fetch("http://localhost:3000/api/suggestion/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id, hostel: student.hostel, title, description: desc }),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("Suggestion registered successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      sendEmail(); // Call the sendEmail function after successful registration
    } else {
      toast.error("Suggestion registration failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const titleChange = (e) => setTitle(e.target.value);
  const descChange = (e) => setDesc(e.target.value);

  const suggestionTitle = {
    name: "Suggestion Title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center max-h-screen overflow-y-auto">
      <form
        method="POST"
        onSubmit={registerSuggestions}
        className="md:w-[30vw] w-full py-5 pb-7 px-10 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-5 transition-transform transform hover:scale-110"
      >
        <Input field={suggestionTitle} />
        <div>
          <label
            htmlFor="suggestion"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Suggestion Description
          </label>
          <textarea
            name="suggestion"
            placeholder="Please Describe your Suggestion, We really appreciate that"
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-transform transform hover:scale-110"
            onChange={descChange}
            value={desc}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center transition-transform transform hover:scale-110"
          >
            Make Suggestion
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />
    </div>
  );
}

export default Suggestions;
