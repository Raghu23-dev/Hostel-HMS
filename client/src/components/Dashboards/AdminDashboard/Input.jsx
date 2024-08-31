import PropTypes from "prop-types";

// Define the prop types for the Input component
Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,          // Name of the input field
    placeholder: PropTypes.string.isRequired,   // Placeholder text for the input
    req: PropTypes.bool.isRequired,             // Boolean indicating if the field is required
    type: PropTypes.string.isRequired,          // Type of the input (e.g., 'text', 'password')
    onChange: PropTypes.func.isRequired,        // Function to handle changes in input value
    value: PropTypes.string,                    // Current value of the input (optional)
  }).isRequired,
};

// Define the Input component
function Input({ field }) {
  // Capitalize the first letter of the field's name
  const name = (field.name).charAt(0).toUpperCase() + (field.name).slice(1);

  // Extract other properties from the field object
  const placeholder = field.placeholder;
  const required = field.req;
  const type = field.type;
  const value = field.value;

  return (
    <div>
      {/* Label for the input field */}
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-white"
      >
        {/* Display 'CMS' if the name is 'cms', otherwise use the capitalized name */}
        {name.toLowerCase() === 'cms' ? 'CMS' : name}
      </label>
      
      {/* Input field */}
      <input
        type={type}                       // Input type (text, password, etc.)
        name={name}                       // Name attribute for the input
        id={name}                         // ID attribute for the input
        className="transition-transform transform hover:scale-110 border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder={placeholder}         // Placeholder text
        required={required}               // Required attribute
        value={value}                     // Current value of the input
        onChange={field.onChange}         // Event handler for input changes
      />
    </div>
  );
}

export { Input };
