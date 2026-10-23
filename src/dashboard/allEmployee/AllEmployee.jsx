"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Error from "../../screens/Error/Error";
import Loading from "../../screens/loading/Loading";
import { FaCheckCircle, FaQuestion } from "react-icons/fa";
import { GiFireDash } from "react-icons/gi";
import axios from "axios";
import Swal from "sweetalert2";

const AllEmployee = () => {
  const [viewMode, setViewMode] = useState("table");

  const {
    data: employees = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allEmpList"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allEmployee`);
      return res.json();
    },
  });

  const fired = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-[#795548] text-white ml-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Fire on the employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, fired this!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .patch(`${process.env.NEXT_PUBLIC_API_URL}/fireEmployee/${id}`, {
              fired: true,
            })
            .then(
              swalWithBootstrapButtons.fire({
                title: "Fired!",
                text: "Fired Completed",
                icon: "success",
              }),
              refetch()
            )
            .catch((err) => {
              // console.log(err);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  if (isPending) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center mb-4">Employee List</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          className="px-4 py-2 bg-[#795548] text-white rounded-lg shadow-md  transition"
        >
          {viewMode === "table"
            ? "Switch to Grid View"
            : "Switch to Table View"}
        </button>
      </div>

      {viewMode === "table" ? (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead className="bg-[#795548] text-gray-700 text-sm  md:text-base lg:text-lg">
              <tr>
                <th className="p-3 text-left text-white">#</th>
                <th className="p-3 text-left text-white">Name</th>
                <th className="p-3 text-left text-white">Designation</th>
                <th className="p-3 text-center text-white ">Make HR</th>
                <th className="p-3 text-center text-white">Fire</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee, index) => (
                <tr key={employee.id}>
                  <td className="p-3 font-semibold text-gray-800">
                    {index + 1}
                  </td>
                  <td className="p-3">{employee.name}</td>
                  <td className="p-3 text-gray-600">{employee.designation}</td>
                  <td className="text-center">
                    <button
                      onClick={async () => {
                        await axios
                          .patch(
                            `${process.env.NEXT_PUBLIC_API_URL}/makeHR/${
                              employee._id
                            }`,
                            { role: "hr" }
                          )
                          .then((response) => {
                            refetch();
                            if (response.data.modifiedCount > 0) {
                              Swal.fire({
                                icon: "success",
                                title: `Now ${employee.name} is HR`,
                                draggable: true,
                              });
                            }
                          });
                      }}
                      className="focus:outline-none"
                    >
                      {employee.role === "hr" ? (
                        <FaCheckCircle className="text-green-500 text-xl " />
                      ) : (
                        <FaQuestion className="text-gray-500 text-xl" />
                      )}
                    </button>
                  </td>
                  <td className="text-center">
                    {employee.fired ? (
                      <span className="text-red-500 font-semibold">Fired</span>
                    ) : (
                      <button onClick={() => fired(employee._id)}>
                        <GiFireDash className="text-2xl text-red-500 ml-3" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="dashboard-table-empty">
                    No employees to display yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees?.map((employee) => (
            <div
              key={employee.id}
              className="bg-white shadow-md rounded-lg p-5 border"
            >
              <h2 className="text-xl font-semibold">{employee.name}</h2>
              <p className="text-gray-600">{employee.designation}</p>
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={async () => {
                    await axios.patch(
                      `${process.env.NEXT_PUBLIC_API_URL}/makeHR/${
                        employee._id
                      }`,
                      { role: "hr" }
                    );
                    refetch();
                  }}
                  className="text-green-600 hover:text-green-700 transition"
                >
                  {employee?.role === "hr" ? (
                    <FaCheckCircle className="text-xl" />
                  ) : (
                    <FaQuestion className="text-xl" />
                  )}
                </button>
                <button className="text-center">
                  {employee?.fired ? (
                    <span className="text-red-500 font-semibold">Fired</span>
                  ) : (
                    <button onClick={() => fired(employee?._id)}>
                      <GiFireDash className="text-2xl text-red-500 ml-3" />
                    </button>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployee;
