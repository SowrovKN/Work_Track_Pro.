"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/firebase/AuthProvider";
import Loading from "../../screens/loading/Loading";
import Error from "../../screens/Error/Error";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const {
    data: employees = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["paymentSuccess"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paymentHistory/${user.email}`
      );
      return res.json();
    },
  });

  if (isPending) return <Loading />;
  if (error) return <Error />;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.max(1, Math.ceil(employees.length / itemsPerPage));

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div>
        <h1 className="mb-4 text-center text-3xl font-bold">Payment History</h1>
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead className="bg-[#795548] text-gray-700 text-sm md:text-base lg:text-lg">
              <tr>
                <th className="p-3 text-center text-white">#</th>
                <th className="p-3 text-center text-white">Month</th>
                <th className="p-3 text-center text-white">Year </th>
                <th className="p-3 text-center text-white">Amount</th>
                <th className="py-3 text-center text-white">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployees?.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-gray-50 text-sm md:text-base lg:text-lg"
                >
                  <td className="p-3 font-semibold text-center text-gray-800">
                    {startIndex + index + 1}
                  </td>
                  <td className="p-3 text-center">{employee.month}</td>
                  <td className="p-3 text-center">{employee.year}</td>
                  <td className="p-3 text-center text-gray-600">
                    {employee.salary}
                  </td>
                  <td className="py-3 text-center font-semibold">
                    {employee.trxId}
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="dashboard-table-empty">
                    Payment history will appear here once a payment is complete.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || employees.length === 0}
            className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <span className="px-3 py-2 text-sm font-medium text-stone-500">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || employees.length === 0}
            className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
