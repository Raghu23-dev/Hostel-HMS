import PropTypes from "prop-types"; // Importing PropTypes for type-checking props

// Defining prop types for the ShortCard component
ShortCard.propTypes = {
  title: PropTypes.string.isRequired, // title: a string that is required
  number: PropTypes.number.isRequired, // number: a number that is required
};

// Functional component ShortCard
function ShortCard({ number, title }) {
  return (
    <div
      className="py-5 w-full bg-neutral-950 text-white flex flex-col gap-3 items-center rounded-xl shadow-xl md:max-w-[350px] transition-transform transform hover:scale-110"
      // Container div with styling for padding, width, background color, text color, layout, border-radius, shadow, and hover effect
    >
      <div className="text-4xl font-bold text-blue-500">
        {number}
        {/* Display the number with large font size and bold styling */}
      </div>
      <div className="text-lg">
        {title}
        {/* Display the title with a medium font size */}
      </div>
    </div>
  );
}

export { ShortCard }; // Exporting ShortCard component for use in other parts of the application
