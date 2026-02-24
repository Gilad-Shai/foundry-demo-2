import { useState } from "react";

const PRIORITY_OPTIONS = ["low", "medium", "high"];

export default function TodoForm({ onAdd, clients, projects }) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newProject, setNewProject] = useState("");
  const [showNewClient, setShowNewClient] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalClient = showNewClient ? newClient.trim() : client;
    const finalProject = showNewProject ? newProject.trim() : project;

    onAdd({
      title: title.trim(),
      client: finalClient,
      project: finalProject,
      priority,
      dueDate,
    });

    setTitle("");
    setClient("");
    setProject("");
    setPriority("medium");
    setDueDate("");
    setNewClient("");
    setNewProject("");
    setShowNewClient(false);
    setShowNewProject(false);
    setIsExpanded(false);
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    high: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h2 className="text-lg font-semibold text-gray-800">Add New Task</h2>
        <p className="text-sm text-gray-500 mt-0.5">Track work across clients and projects</p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!isExpanded && e.target.value) setIsExpanded(true);
            }}
            placeholder="What needs to be done?"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-gray-800 placeholder-gray-400 transition"
          />
        </div>

        {isExpanded && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                {!showNewClient ? (
                  <div className="flex gap-2">
                    <select
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-gray-800 bg-white transition"
                    >
                      <option value="">No client</option>
                      {clients.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewClient(true)}
                      className="px-2 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 transition text-sm font-medium"
                      title="Add new client"
                    >
                      + New
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      placeholder="Client name"
                      className="flex-1 px-3 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800 placeholder-gray-400 transition"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewClient(false);
                        setNewClient("");
                      }}
                      className="px-2 py-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200 transition text-sm"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                {!showNewProject ? (
                  <div className="flex gap-2">
                    <select
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-gray-800 bg-white transition"
                    >
                      <option value="">No project</option>
                      {projects.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewProject(true)}
                      className="px-2 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 transition text-sm font-medium"
                      title="Add new project"
                    >
                      + New
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProject}
                      onChange={(e) => setNewProject(e.target.value)}
                      placeholder="Project name"
                      className="flex-1 px-3 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800 placeholder-gray-400 transition"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewProject(false);
                        setNewProject("");
                      }}
                      className="px-2 py-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200 transition text-sm"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex gap-2">
                  {PRIORITY_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium capitalize transition ${
                        priority === p
                          ? priorityColors[p] + " shadow-sm"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-gray-800 transition"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg transition shadow-sm disabled:cursor-not-allowed"
          >
            Add Task
          </button>
          {isExpanded && (
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setClient("");
                setProject("");
                setPriority("medium");
                setDueDate("");
                setNewClient("");
                setNewProject("");
                setShowNewClient(false);
                setShowNewProject(false);
              }}
              className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200 transition font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}