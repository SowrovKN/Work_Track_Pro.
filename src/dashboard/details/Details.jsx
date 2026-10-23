"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../screens/loading/Loading";
import Error from "../../screens/Error/Error";
import { useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Details = () => {
  const params = useParams();
  const {
    data: employee = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["details", params.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/details/${params.id}`
      );
      return res.json();
    },
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Error />
      </div>
    );

  return (
    <div className="flex justify-center items-center p-4 rounded-lg bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Employee Details
        </h1>

        <div className="flex flex-col sm:flex-row border-0 border-b border-gray-300 items-center gap-6 p-4">
          <img
            src={employee.photoUrl}
            alt={employee.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gray-300 object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-lg md:text-xl font-bold text-blue-700">
              {employee.name}
            </h2>
            <p className="text-gray-600">{employee.role}</p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 border-b border-gray-300 pb-2">
            <span className="font-semibold text-gray-800">Email:</span>
            <span className="text-gray-600 font-bold">{employee.email}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 border-b border-gray-300 pb-2">
            <span className="font-semibold text-gray-800">Role:</span>
            <span className="text-gray-600 font-bold">{employee.role}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 border-b border-gray-300 pb-2">
            <span className="font-semibold text-gray-800">
              Bank Account No.:
            </span>
            <span className="text-gray-600 font-bold">{employee.account}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 border-b border-gray-300 pb-2">
            <span className="font-semibold text-gray-800">Salary:</span>
            <span className="text-gray-600 font-bold">${employee.salary}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 border-b border-gray-300 pb-2">
            <span className="font-semibold text-gray-800">Designation:</span>
            <span className="text-gray-600 font-bold">
              {employee.designation}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              Verification Status:
            </span>
            {employee.verified ? (
              <FaCheckCircle className="text-green-500 text-xl" />
            ) : (
              <ImCross className="text-red-500 text-xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
