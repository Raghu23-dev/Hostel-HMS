import PropTypes from "prop-types";

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    req: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

function Input({ field }) {
  const { name, placeholder, req: required, type } = field;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-white"
      >
        Your {name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none transition-transform transform hover:scale-105 hover:shadow-lg"
        placeholder={placeholder}
        required={required}
        onChange={field.onChange}
      />
    </div>
  );
}

export { Input };
