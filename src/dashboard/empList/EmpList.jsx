"use client";

import { FaCheckCircle } from "react-icons/fa";
import { BsFillEyeFill, BsCurrencyDollar } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../screens/loading/Loading";
import Error from "../../screens/Error/Error";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const EmpList = () => {
  const {
    data: employees = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["emplist"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`);
      return res.json();
    },
  });

  //  paybtn
  const payBtn = async (salary, name, email) => {
    const { value: formValues } = await Swal.fire({
      title: "Send payment request",
      html: `
        <input id="swal-input1" class="swal2-input "placeholder="Enter Month" required>
        <input id="swal-input2" class="swal2-input " placeholder="Enter Year" required>
        <input id="swal-input3"  value=${salary} class="swal2-input"  readonly>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const month = document.getElementById("swal-input1").value;
        const year = document.getElementById("swal-input2").value;
        const salary = document.getElementById("swal-input3").value;
        if (!month || !year) {
          Swal.showValidationMessage("Please fill all required fields!");

          return false;
        }
        return { month, year, salary };
      },
    });
    if (formValues) {
      const { month, year, salary } = formValues;
      const values = {
        month,
        year,
        salary,
        name,
        payment: false,
        date: "-",
        email,
      };
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/paymentReq`, values)

          .then((response) => {
            if(response.data.insertedId){
              Swal.fire({
                icon: "success",
                title: "Payment Request is Sended",
                draggable: true,
              });
            }
          });
      } catch (err) {
        // console.log(err);
      }
    }
  };
  if (isPending) return <Loading />;
  if (error) return <Error />;
  refetch();
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">Employee List</h1>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead className="bg-[#795548] text-gray-700 text-sm md:text-base lg:text-lg">
            <tr>
              <th className="p-3 text-left text-white">#</th>
              <th className="p-3 text-left text-white">Name</th>
              <th className="p-3 text-left text-white">Email</th>
              <th className="p-3 text-center text-white">Verified</th>
              <th className="p-3 text-center text-white">Bank Account</th>
              <th className="p-3 text-center text-white">Salary</th>
              <th className="p-3 text-center text-white">Pay</th>
              <th className="p-3 text-center text-white">Details</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, index) => (
              <tr key={employee.id}>
              <td className="p-3 font-semibold text-gray-800">{index + 1}</td>
              <td className="p-3">{employee.name}</td>
              <td className="p-3 text-gray-600">{employee.email}</td>
              <td className="p-3 text-center">
                <button
                  onClick={async () => {
                    await axios
                      .patch(
                        `${process.env.NEXT_PUBLIC_API_URL}/verified/${
                          employee._id
                        }`,
                        { verified: !employee.verified }
                      )
                      .then((response) => {
                        if (response.data.modifiedCount > 0) {
                          refetch();

                          Swal.fire({
                            icon: !employee.verified ? "success" : "info",
                            title: !employee.verified
                              ? "Verified Successfully"
                              : "Verification Removed",
                            draggable: true,
                          });
                        }
                      });
                    refetch();
                  }}
                  className="focus:outline-none"
                >
                  {employee.verified ? (
                    <FaCheckCircle className="text-green-500 text-xl mx-auto" />
                  ) : (
                    <ImCross className="text-red-500 text-xl mx-auto" />
                  )}
                </button>
              </td>
              <td className="p-3 text-center">{employee.account}</td>
              <td className="p-3 text-center font-semibold">
                {employee.salary}
              </td>
              <td className="p-3 text-center">
                {employee.verified ? (
                  <button
                    onClick={() =>
                      payBtn(employee.salary, employee.name, employee.email)
                    }
                    className="bg-[#795548] text-white p-2 rounded-lg hover:bg-[#462f26]"
                  >
                    <BsCurrencyDollar className="text-xl" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white p-2 rounded-lg "
                  >
                    <BsCurrencyDollar className="text-xl" />
                  </button>
                )}
              </td>
              <td className="p-3 text-center">
                <Link href={`/dashboard/details/${employee._id}`}>
                  <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                    <BsFillEyeFill className="text-xl text-gray-700" />
                  </button>
                </Link>
              </td>
            </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={8} className="dashboard-table-empty">
                  No employees are available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpList;
