import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import emailjs from 'emailjs-com'; // Import EmailJS

Topbar.propTypes = {
  name: PropTypes.string.isRequired,
  showContactButton: PropTypes.bool, // New prop
};

function Topbar({ name, showContactButton = true }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  const refreshClock = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const sendEmail = () => {
    const templateParams = {
      from_name: name,
      to_name: 'Manager',
      message: 'I would like to get in touch regarding vacating from the hostel next week.',
    };

    emailjs.send('service_1dkk8jj', 'template_sa737rh', templateParams, 'dW61nSCuXlmi55Rng')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email.');
      });
  };

  return (
    <div className="py-3 px-5 flex items-center justify-between text-white w-full bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <span>{date.toLocaleTimeString()}</span>
      </div>
      <span className="font-bold text-2xl text-blue-500">
        <span className="font-thin text-lg text-white">Hello there 👋,</span> {name}
      </span>
      <div className="flex items-center gap-3">
        {showContactButton && (
          <button
            onClick={sendEmail}
            className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-110"
          >
            Get in touch
          </button>
        )}
      </div>
    </div>
  );
}

export { Topbar };
