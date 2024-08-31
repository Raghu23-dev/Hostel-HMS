import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import emailjs from 'emailjs-com'; // Import EmailJS for sending emails

// Define prop types for the Topbar component to validate the props passed to it.
Topbar.propTypes = {
  name: PropTypes.string.isRequired, // Ensures `name` is a required string prop.
  showContactButton: PropTypes.bool,  // Optional prop to conditionally display the contact button.
};

// Topbar component that renders a fixed header with a clock, user greeting, and optional contact button.
function Topbar({ name, showContactButton = true }) {
  const navigate = useNavigate(); // Hook to programmatically navigate the user.
  const [date, setDate] = useState(new Date()); // State to store the current date and time.

  // Function to log the user out by removing specific items from local storage and redirecting to the home page.
  const logout = () => {
    localStorage.removeItem("student"); // Removes 'student' data from local storage.
    localStorage.removeItem("token");   // Removes 'token' data from local storage.
    navigate("/");                      // Redirects to the home page.
  };

  // Function to update the clock by setting the current date and time.
  const refreshClock = () => {
    setDate(new Date());
  };

  // useEffect hook to set up a timer that updates the clock every second.
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000); // Sets the clock to refresh every second.
    return () => {
      clearInterval(timerId); // Cleans up the interval on component unmount.
    };
  }, []);

  // Function to send an email using EmailJS when the 'Get in touch' button is clicked.
  const sendEmail = () => {
    const templateParams = {
      from_name: name, // The name of the sender (passed as a prop).
      to_name: 'Manager', // Recipient of the email (e.g., Manager).
      message: 'I would like to get in touch regarding vacating from the hostel next week.', // The message content.
    };

    // Sends the email using EmailJS service with specific service, template IDs, and user credentials.
    emailjs.send('service_1dkk8jj', 'template_sa737rh', templateParams, 'dW61nSCuXlmi55Rng')
      .then((response) => {
        console.log('Email sent successfully:', response); // Logs success response.
        alert('Email sent successfully!'); // Alerts the user of successful email sending.
      })
      .catch((error) => {
        console.error('Error sending email:', error); // Logs error if email sending fails.
        alert('Failed to send email.'); // Alerts the user of failure.
      });
  };

  return (
    // Main container of the Topbar with fixed positioning at the top, spanning the full width.
    <div className="py-3 px-5 flex items-center justify-between text-white w-full bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      {/* Displays the current time with a refresh every second */}
      <div className="flex items-center gap-3">
        <span>{date.toLocaleTimeString()}</span> {/* Formats the date object to a locale time string */}
      </div>

      {/* Greeting message displaying "Hello there" and the user's name */}
      <span className="font-bold text-2xl text-blue-500">
        <span className="font-thin text-lg text-white">Hello there 👋,</span> {name}
      </span>

      {/* Conditional rendering of the 'Get in touch' button based on the `showContactButton` prop */}
      <div className="flex items-center gap-3">
        {showContactButton && (
          <button
            onClick={sendEmail} // Triggers the sendEmail function when clicked.
            className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-110"
          >
            Get in touch
          </button>
        )}
      </div>
    </div>
  );
}

// Exporting the Topbar component for use in other parts of the application.
export { Topbar };
