"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../screens/loading/Loading";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/firebase/AuthProvider";
import Swal from "sweetalert2";
import Error from "../../screens/Error/Error";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const {
    data: tasks = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["speciicWorkList"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/worklist/${user.email}`
      );
      const data = await res.json();
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const workName = form.work.value;
    const time = form.time.value;
    const date = form.date.value;
    const email = user.email;
    const name = user.displayName;
    const newWork = { workName, time, date, email, name };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/workAdd`, newWork);
      refetch();
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Word Added Successful",
        draggable: true,
      });
    } catch (err) {
      // console.error("Error adding work:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn bg-[#795548] ml-3 text-white",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios
              .delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteWork/${id}`)
              .then((data) => {
                // console.log(data);
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: " Your work has been deleted.",
                  icon: "success",
                });
              });
            refetch();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imfileaginary work is safe :)",
              icon: "error",
            });
          }
        });
    } catch (err) {
      // console.error(err);
    }
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/updateWork/${selectedTask._id}`,
        {
          workName: selectedTask.workName,
          time: selectedTask.time,
          date: selectedTask.date,
        }
      );
      refetch();
      Swal.fire({
        icon: "success",
        title: "Work Updated",
        draggable: true,
      });
      setIsModalOpen(false);
    } catch (err) {
      // console.error("Error updating work:", err);
    }
  };

  if (isPending) return <Loading />;
  if (error) return <Error></Error>;

  return (
    <div className="w-full mx-auto md:p-4 ">
      <h1 className="text-3xl font-bold text-center mb-4">Work Sheet</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">Add a New Work Query</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        >
          <select name="work" className="border outline-[#795548] p-2 rounded w-full">
            <option value="" hidden>
              Select Your Task
            </option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="paper">Paper Work</option>
            <option value="content">Content</option>
          </select>
          <input
            type="number"
            name="time"
            placeholder="Hours Worked"
            className="border outline-[#795548] p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="date"
            className="border outline-[#795548] p-2 rounded w-full"
            required
          />
          <button className="bg-[#795548] text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>

      <div className="dashboard-table-wrap mt-6">
        <table className="dashboard-table">
          <thead>
            <tr className="bg-[#795548] text-sm md:text-base lg:text-lg ">
              <th className="p-2 text-white">#</th>
              <th className="p-2 text-white">Task</th>
              <th className="p-2 text-white">Working Hours</th>
              <th className="p-2 text-white">Date</th>
              <th className="p-2 text-white">Edit</th>
              <th className="p-2 text-white">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, index) => (
              <tr key={task._id || index} className="text-center">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{task.workName}</td>
                <td className="p-2">{task.time}</td>
                <td className="p-2">{task.date}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleOpenModal(task)}
                    className="text-blue-500"
                  >
                    ✏️
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={6} className="dashboard-table-empty">
                  No work entries yet. Add your first task above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-blue-200/50 backdrop-blur-sm"></div>

          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-xl font-bold mb-4">Update Work</h2>

            <select
              value={selectedTask.workName}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, workName: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="paper">Paper Work</option>
              <option value="content">Content</option>
            </select>

            <input
              type="number"
              value={selectedTask.time}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, time: e.target.value })
              }
              placeholder="Hours Worked"
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="date"
              value={selectedTask.date}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, date: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#795548] text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;
