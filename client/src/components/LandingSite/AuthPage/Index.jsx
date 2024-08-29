import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[60vh] lg:py-0">
          <Outlet />
        </div>
      </section>
    </>
  );
}