"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../screens/loading/Loading";
import Error from "../../screens/Error/Error";

const Progress = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const {
    data: employees = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["work"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/worklist`);
      return res.json();
    },
  });

  if (isPending) return <Loading />;
  if (error) return <Error />;

  const filteredData = employees?.filter((emp) => {
    const matchesName = !selectedName || emp.name === selectedName;
    const month = emp?.date?.split("-")[1];
    const matchesMonth = !selectedMonth || month === selectedMonth;
    return matchesName && matchesMonth;
  });

  const totalHours = filteredData.reduce(
    (sum, emp) => sum + parseInt(emp?.time),
    0
  );

  return (
    <div className=" w-full mx-auto ">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        All Employee Progress
      </h1>

      {/* Filter Options */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
        <select
          onChange={(e) => setSelectedName(e.target.value)}
          className="p-2 border rounded-lg w-full sm:w-1/3 text-sm md:text-base"
        >
          <option value="" hidden>
            Sort by Name
          </option>
          {[...new Set(employees?.map((emp) => emp.name))].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-lg w-full sm:w-1/3 text-sm md:text-base"
        >
          <option value="">All Months</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index} value={String(index + 1).padStart(2, "0")}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Total Hours */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#795548]/10 bg-white px-5 py-4 shadow-sm">
        <span className="text-sm font-medium text-stone-500">Total work hours</span>
        <span className="text-2xl font-bold tracking-tight text-[#795548]">
          {totalHours}
          <span className="ml-1.5 text-sm font-medium text-stone-500">hrs</span>
        </span>
      </div>

      {/* Responsive Table */}
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead className="bg-[#795548] text-sm sm:text-sm md:text-base lg:text-lg">
            <tr>
              <th className="p-2 text-left text-white">#</th>
              <th className="p-2 text-left text-white">Name</th>
              <th className="p-2 text-left text-white">Email</th>
              <th className="p-2 text-left text-white">Task</th>
              <th className="p-2 text-center text-white">Hours</th>
              <th className="p-2 text-center text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((emp, index) => (
              <tr key={emp.id}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.workName}</td>
                <td className="p-2 text-center">{emp.time}</td>
                <td className="p-2 text-center">{emp.date}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="dashboard-table-empty">
                  No work records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
