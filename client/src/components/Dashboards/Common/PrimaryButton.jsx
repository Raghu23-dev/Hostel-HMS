import PropTypes from "prop-types";

// Define prop types for the Button component to validate the props passed to it.
Button.propTypes = {
  children: PropTypes.element, // Ensures that the `children` prop is a valid React element (e.g., JSX tags).
};

// Button component that renders a styled button element.
function Button({ children }) {
  return (
    <button
      type="submit" // Sets the button type to "submit", commonly used for form submission.
      className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800"
      // Applies Tailwind CSS classes:
      // - `w-full`: Full-width button.
      // - `text-white`: White text color.
      // - `hover:bg-blue-700`: Changes the background to a darker blue on hover.
      // - `focus:ring-4`: Adds a 4px ring effect when focused.
      // - `focus:outline-none`: Removes the default focus outline.
      // - `font-medium`: Sets the font weight to medium.
      // - `rounded-lg`: Applies large rounded corners.
      // - `text-sm`: Sets the font size to small.
      // - `px-5 py-2.5`: Adds padding on the x (horizontal) and y (vertical) axes.
      // - `text-center`: Centers the text inside the button.
      // - `bg-blue-700`: Sets the button background color to blue.
      // - `focus:ring-blue-800`: Changes the ring color to a darker blue when focused.
    >
      {children} {/* Renders the children elements passed to the Button component inside the button */}
    </button>
  );
}

// Exports the Button component for use in other parts of the application.
export { Button };
