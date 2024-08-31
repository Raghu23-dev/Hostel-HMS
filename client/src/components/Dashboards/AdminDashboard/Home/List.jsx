import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import PropTypes from "prop-types"; // Importing PropTypes for type-checking props

// Defining prop types for the List component
List.propTypes = {
  list: PropTypes.array.isRequired, // list: an array that is required
  title: PropTypes.string.isRequired, // title: a string that is required
  addClasses: PropTypes.string, // addClasses: an optional string for additional CSS classes
  icon: PropTypes.element.isRequired, // icon: a React element (icon) that is required
};

// Functional component List
function List({ list, title, icon, addClasses }) {
  return (
    <div
      className={`bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-full md:max-w-[350px] max-h-96 overflow-auto ${addClasses}`}
      // Container div with dynamic class names for styling
      // Tailwind CSS classes are used for background color, padding, border-radius, shadow, width, height, and overflow
    >
      <div className="flex flex-col justify-between h-full">
        {/* Title section */}
        <span className="text-white font-bold text-xl ml-3">New {title}</span>
        {/* Unordered list for displaying items */}
        <ul className="divide-y divide-gray-700 text-white">
          {list.length === 0 ? (
            // Display this list item if the list is empty
            <li className="mt-2 pl-3 mb-5">No new {title}</li>
          ) : (
            // Map over the list and display each item
            list.map((item) => (
              <li
                className="group py-3 pl-3 rounded sm:py-4 hover:bg-neutral-700 hover:shadow-xl hover:scale-110 transition-all cursor-pointer"
                key={item.id}
                // List item with styling for hover effects and transitions
              >
                <div className="flex items-center space-x-4">
                  {/* Icon section */}
                  <div className="flex-shrink-0 text-white">{icon}</div>
                  {/* Item details section */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {item.title}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        {/* Link to manage the list */}
        <Link
          className="py-3 text-lg text-center rounded-lg w-full text-white border-blue-600 border-2 hover:bg-blue-600 transition-all"
          to={title}
        >
          Manage {title}
        </Link>
      </div>
    </div>
  );
}

export { List }; // Exporting List component for use in other parts of the application
