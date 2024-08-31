import { Outlet } from "react-router-dom"; // Import Outlet for rendering nested routes

export default function AuthPage() {
  return (
    <>
      {/* Main container section with background color */}
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[60vh] lg:py-0">
          {/* Outlet component to render nested routes */}
          <Outlet />
        </div>
      </section>
    </>
  );
}
