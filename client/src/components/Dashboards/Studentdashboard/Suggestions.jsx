import { useState } from "react"; // Import useState hook from React
import { Input } from "../../LandingSite/AuthPage/Input"; // Import Input component
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import emailjs from 'emailjs-com'; // Import emailjs for sending emails

function Suggestions() {
  // State to hold the title and description of the suggestion
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Function to send an email notification when a suggestion is made
  const sendEmail = () => {
    // Template parameters for the email
    const templateParams = {
      from_name: 'HMS SMS Team', // Sender name
      to_name: 'Manager', // Recipient name
      message: `Hello Manager,

You got a new Suggestion: "${title}". Please Acknowledge.

Regards,
HMS SMS Team`,
    };

    // Sending email using emailjs
    emailjs.send('service_5q11fqs', 'template_6mbel6a', templateParams, 'dW61nSCuXlmi55Rng')
      .then((response) => {
        // On successful email send, show success toast notification
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
        // On failure, show error toast notification
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

  // Function to register the suggestion with the backend API
  const registerSuggestions = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const student = JSON.parse(localStorage.getItem("student")); // Retrieve the student data from localStorage
    // Make a POST request to the API to register the suggestion
    const response = await fetch("http://localhost:3000/api/suggestion/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the student's ID, hostel, title, and description in the request body
      body: JSON.stringify({ student: student._id, hostel: student.hostel, title, description: desc }),
    });

    const data = await response.json(); // Parse the response data
    console.log(data);
    if (data.success) {
      // If registration is successful, show success toast and send an email
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
      // If registration fails, show an error toast
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

  // Handlers for updating the title and description state
  const titleChange = (e) => setTitle(e.target.value);
  const descChange = (e) => setDesc(e.target.value);

  // Configuration for the suggestion title input field
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
      {/* Form for submitting a suggestion */}
      <form
        method="POST"
        onSubmit={registerSuggestions}
        className="md:w-[30vw] w-full py-5 pb-7 px-10 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-5 transition-transform transform hover:scale-110"
      >
        {/* Input field for the suggestion title */}
        <Input field={suggestionTitle} />
        <div>
          {/* Label and textarea for the suggestion description */}
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
          {/* Submit button for making a suggestion */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center transition-transform transform hover:scale-110"
          >
            Make Suggestion
          </button>
        </div>
      </form>
      {/* ToastContainer for showing notifications */}
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
