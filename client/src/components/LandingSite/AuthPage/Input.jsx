import PropTypes from "prop-types"; // Import PropTypes for type-checking props

// Define prop types for the Input component
Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired, // Name of the input field
    placeholder: PropTypes.string.isRequired, // Placeholder text for the input field
    req: PropTypes.bool.isRequired, // Boolean indicating if the input is required
    type: PropTypes.string.isRequired, // Type of the input (e.g., "text", "password")
    onChange: PropTypes.func.isRequired, // Function to handle changes to the input value
    value: PropTypes.string, // Value of the input field
  }).isRequired,
};

function Input({ field }) {
  // Destructure the properties from the field object
  const { name, placeholder, req: required, type, value } = field;

  return (
    <div>
      {/* Label for the input field */}
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">
        Your {name}
      </label>
      {/* Input field */}
      <input
        type={type}
        name={name}
        id={name}
        className="hover:scale-110 transition-transform transform border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={field.onChange}
      />
    </div>
  );
}

export { Input };
