// import Footer from "@/layouts/footer";

// export default function AdminDashboard() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <StatCard title="Staff" value="24" />
//       <StatCard title="Videos" value="12" />
//       <StatCard title="Pending Leaves" value="3" />
//       <StatCard title="Tasks" value="18" />
//     </div>
//   );
// }

// function StatCard({ title, value }: { title: string; value: string }) {
//   return (
//     <div className="bg-white rounded shadow p-4">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h3 className="text-2xl font-bold">{value}</h3>
      
//     </div>
//   );
// }

"use client";

import { Icon } from "@iconify/react";

const stats = [
  { label: "Total Users", value: "1,284", icon: "fa:users" },
  { label: "Active Campaigns", value: "32", icon: "mdi:bullhorn" },
  { label: "Total Income", value: "₦12,450,000", icon: "healthicons:low-income-level" },
  { label: "Vouchers Issued", value: "412", icon: "mdi:voucher" },
];

const quickActions = [
  { label: "Upload Media", icon: "fluent-mdl2:media-add", href: "/admin/upload-videos" },
  { label: "Create Voucher", icon: "mdi:voucher", href: "/admin/vouchers" },
  { label: "Manage Users", icon: "fa:users-cog", href: "/admin/all-staff" },
  { label: "Download Income", icon: "solar:download-bold", href: "/admin/announcement" },
  { label: "Backup Database", icon: "solar:database-bold", href: "/admin/database" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-500">Monitor activity, manage content, and keep your platform healthy.</p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-6 shadow-sm border flex items-center gap-4"
          >
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon icon={stat.icon} className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(action => (
            <a
              key={action.label}
              href={action.href}
              className="group rounded-xl border p-4 flex items-center gap-4 hover:border-blue-600 hover:bg-blue-50 transition"
            >
              <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-blue-600 group-hover:text-white transition">
                <Icon icon={action.icon} />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-blue-700">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Activity / System Health */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Platform Summary</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔ Media uploads running normally</li>
            <li>✔ Payment processing active</li>
            <li>✔ Database backups up to date</li>
            <li>✔ No pending system alerts</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Admin Notes</h2>
          <p className="text-sm text-gray-500">
            Keep an eye on daily income trends and user engagement. Ensure campaigns are properly moderated and media is optimized for fast delivery.
          </p>
        </div>
      </section>
    </div>
  );
}



// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import DailyTasks from "@/layouts/daily-task";

// type TaskInput = {
//   title: string;
//   description?: string;
//   startTime?: string;
//   endTime?: string;
// };

// export default function CreateTasksPage() {
//   const [userId, setUserId] = useState("");
//   const [date, setDate] = useState("");
//   const [tasks, setTasks] = useState<TaskInput[]>([{ title: "" }]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [refreshKey, setRefreshKey] = useState(0); // triggers reload

//   async function saveTasks(payload: any) {
//     try {
//       const res = await fetch("/api/tasks/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const text = await res.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         throw new Error("Server returned invalid JSON");
//       }

//       if (!res.ok) throw new Error(data.error || "Failed to create tasks");

//       return data;
//     } catch (err: any) {
//       throw err;
//     }
//   }

//   function updateTask(index: number, field: keyof TaskInput, value: string) {
//     const newTasks = [...tasks];
//     newTasks[index][field] = value;
//     setTasks(newTasks);
//   }

//   function addTaskField() {
//     setTasks([...tasks, { title: "" }]);
//   }

//   function removeTaskField(index: number) {
//     setTasks(tasks.filter((_, i) => i !== index));
//   }

//   async function handleSubmit() {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     if (!userId.trim()) return setError("User ID is required");
//     if (!date.trim()) return setError("Date is required");

//     const filteredTasks = tasks.filter((t) => t.title.trim());
//     if (filteredTasks.length === 0) {
//       return setError("At least one task is required");
//     }

//     const payload = { userId, date, tasks: filteredTasks };

//     try {
//       await saveTasks(payload);
//       setSuccess("Tasks created successfully!");

//       // Reset inputs
//       setTasks([{ title: "" }]);
//       setUserId("");
//       setDate("");

//       setRefreshKey((k) => k + 1); // reload DailyTasks
//     } catch (err: any) {
//       setError(err.message || "Failed to save tasks");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto p-4 space-y-6">
//       <h1 className="text-xl font-bold">Create Daily Tasks</h1>

//       {error && <p className="text-red-600 text-sm">{error}</p>}
//       {success && <p className="text-green-600 text-sm">{success}</p>}

//       {/* User ID */}
//       <div className="space-y-2">
//         <label className="font-medium">User ID</label>
//         <input
//           className="w-full border p-2 rounded"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           placeholder="Enter user ID"
//         />
//       </div>

//       {/* Date */}
//       <div className="space-y-2">
//         <label className="font-medium">Date</label>
//         <input
//           type="date"
//           className="w-full border p-2 rounded"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       {/* Tasks */}
//       <div className="space-y-2">
//         <label className="font-medium">Tasks</label>

//         {tasks.map((task, index) => (
//           <div key={index} className="flex gap-2 items-center">
//             <input
//               className="flex-1 border p-2 rounded"
//               placeholder={`Task ${index + 1} title`}
//               value={task.title}
//               onChange={(e) => updateTask(index, "title", e.target.value)}
//             />

//             <input
//               type="time"
//               className="w-28 border p-2 rounded"
//               value={task.startTime || ""}
//               onChange={(e) => updateTask(index, "startTime", e.target.value)}
//             />

//             <input
//               type="time"
//               className="w-28 border p-2 rounded"
//               value={task.endTime || ""}
//               onChange={(e) => updateTask(index, "endTime", e.target.value)}
//             />

//             {tasks.length > 1 && (
//               <button
//                 className="px-2 py-1 bg-red-500 text-white rounded"
//                 onClick={() => removeTaskField(index)}
//               >
//                 X
//               </button>
//             )}
//           </div>
//         ))}

//         <button
//           className="px-3 py-1 bg-blue-500 text-white rounded"
//           onClick={addTaskField}
//         >
//           + Add Task
//         </button>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="w-full bg-black text-white p-2 rounded mt-4 disabled:opacity-50"
//       >
//         {loading ? "Saving..." : "Save Tasks"}
//       </button>

//       {/* Admin-only preview of tasks */}
//       {userId && date && (
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold">Tasks for {date}</h2>

//           {/* Refresh key fixes useEffect bugs */}
//           <DailyTasks key={refreshKey} userId={userId} date={date} />
//         </div>
//       )}
//     </div>
//   );
// }
