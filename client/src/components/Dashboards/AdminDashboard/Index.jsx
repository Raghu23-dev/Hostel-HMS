import { Outlet } from "react-router-dom";
import { Sidebar } from "../Common/Sidebar";
import { Topbar } from "../Common/Topbar";
import { useEffect, useState } from "react";

export default function Index() {
  const dashboard = "student";
  const links = [
    {
      text: "Home",
      url: "/admin-dashboard",
      for: dashboard,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      text: "Register Student",
      url: "/admin-dashboard/register-student",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      ),
    },
    {
      text: "All Students",
      url: "/admin-dashboard/all-students",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM19.707 15.707A7.978 7.978 0 0012 14a7.978 7.978 0 00-7.707 1.707A1 1 0 005 18h14a1 1 0 00.707-1.293z"
          />
        </svg>
      ),
    },
    {
      text: "Attendance",
      url: "/admin-dashboard/attendance",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      ),
    },
   
    
    {
      text: "Complaints",
      url: "/admin-dashboard/complaints",
      svg: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <path d="M4 4h16v16H4z" /> <path d="M4 6h16" /> <path d="M4 10h16" />{" "}
          <path d="M4 14h16" /> <path d="M4 18h16" />
        </svg>
      ),
    },
    {
      text: "Suggestions",
      url: "/admin-dashboard/suggestions",
      svg: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <path d="M4 4h16v16H4z" /> <path d="M4 6h16" /> <path d="M4 10h16" />{" "}
          <path d="M4 14h16" /> <path d="M4 18h16" />
        </svg>
      ),
    },
    
  ];

  const admin = JSON.parse(localStorage.getItem("admin"));

  const [notifications, setNotifications] = useState([
    368115, 347403, 377902, 369420,
  ]);

  useEffect(() => {
    //! FETCH FROM DATABASE DANISH
    setNotifications([368115, 347403, 377902, 369420]);
  }, []);

  // Determine if the current route is the admin dashboard
  const isAdminDashboard = window.location.pathname.startsWith('/admin-dashboard');

  return (
    <div className="flex">
      <Sidebar links={links} />
      <Topbar name={admin.name} notifications={notifications} showContactButton={!isAdminDashboard} />
      <div className="w-full bg-stone-900 h-screen">
        <Outlet />
      </div>
    </div>
  );
}
