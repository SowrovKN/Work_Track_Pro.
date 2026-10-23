"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../screens/loading/Loading";
import Error from "../../screens/Error/Error";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Payroll = () => {
  const {
    data: employees = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reqlist"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getPaymentReq`
      );
      return res.json();
    },
  });

  const payBtn = async (id, employee) => {
    const currentDate = new Date().toLocaleDateString("en-GB");
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/paymentStatus/${id}`,
        {
          payment: true,
          date: currentDate,
        }
      );

      refetch();
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        draggable: true,
      });

      paymentSend(employee);
    } catch (err) {
      console.error("Payment update error:", err);
    }
  };

  const paymentSend = async (employee) => {
    try {
      const trxId = Math.random().toString(36).substring(2, 12).toUpperCase();
      const { email, salary, month, year } = employee;
      const data = { email, salary, month, year, trxId };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/successPayment`,
        data
      );
    } catch (err) {
      console.error("Error sending payment:", err);
    }
  };

  if (isPending) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Employee Payroll
      </h1>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead className="bg-[#795548] text-xs sm:text-sm md:text-base text-white">
            <tr>
              <th className="p-2 md:p-3 text-left">#</th>
              <th className="p-2 md:p-3 text-left">Name</th>
              <th className="p-2 md:p-3 text-left">Salary</th>
              <th className="p-2 md:p-3 text-center">Month</th>
              <th className="p-2 md:p-3 text-center">Year</th>
              <th className="p-2 md:p-3 text-center">Payment</th>
              <th className="p-2 md:p-3 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, index) => (
              <tr key={employee._id}>
                <td className="p-2 md:p-3 font-semibold text-gray-800">
                  {index + 1}
                </td>
                <td className="p-2 md:p-3">{employee.name}</td>
                <td className="p-2 md:p-3 text-gray-600">{employee.salary}</td>
                <td className="p-2 md:p-3 text-center">{employee.month}</td>
                <td className="p-2 md:p-3 text-center">{employee.year}</td>
                <td className="p-2 md:p-3 text-center">
                  {employee.payment ? (
                    <button disabled className="opacity-50 cursor-not-allowed">
                      <FaCheckCircle className="text-gray-400 text-2xl mx-auto" />
                    </button>
                  ) : (
                    <button
                      onClick={() => payBtn(employee._id, employee)}
                      className="hover:scale-110 transition-transform"
                    >
                      <FaCheckCircle className="text-green-500 text-2xl mx-auto" />
                    </button>
                  )}
                </td>
                <td className="p-2 md:p-3 text-center font-semibold">
                  {employee.date || "N/A"}
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={7} className="dashboard-table-empty">
                  No payroll requests to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
