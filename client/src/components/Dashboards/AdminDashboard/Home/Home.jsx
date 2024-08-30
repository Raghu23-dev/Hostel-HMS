import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));

  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: "AbdulAhad [ Room: 368 ]",
      desc: "from 28-5-2023 to 29-5-2023",
    },
    {
      id: 2,
      title: "AbdulAhad [ Room: 368 ]",
      desc: "from 28-5-2023 to 29-5-2023",
    },
  ]);

  const suggestionIcon = (
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
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const data = [
    { name: "", DailyComplaints: 20 },
    { name: "", DailyComplaints: 40 },
    { name: "", DailyComplaints: 15 },
    { name: "", DailyComplaints: 90 },
    { name: "", DailyComplaints: 3 },
    { name: "", DailyComplaints: 50 },
    { name: "", DailyComplaints: 20 },
  ];

  const graph = (
    <ResponsiveContainer
      width="100%"
      height="85%"
      className={
        "bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-full max-w-[350px] max-h-96"
      }
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          bottom: 15,
          left: -25,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <Legend verticalAlign="top" height={36} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="DailyComplaints"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{admin.name || "admin"}!</span>
      </h1>
      <h1 className="text-white text-xl">Manager, {hostel.name || "hostel"}</h1>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={200} />
        <ShortCard title="Total Complaints" number={50} />
        <ShortCard title="Total Suggestions" number={70} />
      </div>
      <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        {graph}
        <List list={suggestions} title="suggestions" icon={suggestionIcon} />
      </div>
    </div>
  );
}

export default Home;
