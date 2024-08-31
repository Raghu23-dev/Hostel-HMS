import { Outlet } from "react-router-dom"; // Importing Outlet from react-router-dom for nested routing
import { Navbar } from "./Navbar"; // Importing Navbar component

// Main Index component
export default function Index() {
  return (
    <>
      {/* Rendering the Navbar component */}
      <Navbar />
      {/* Rendering the nested routes */}
      <Outlet />
    </>
  );
}
