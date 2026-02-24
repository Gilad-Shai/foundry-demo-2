import React, { useMemo } from 'react';

const Dashboard = ({ todos }) => {
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = todos.filter(t => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    const byClient = todos.reduce((acc, todo) => {
      const client = todo.client || 'Unassigned';
      if (!acc[client]) {
        acc[client] = { total: 0, completed: 0 };
      }
      acc[client].total += 1;
      if (todo.completed) acc[client].completed += 1;
      return acc;
    }, {});

    const byProject = todos.reduce((acc, todo) => {
      const project = todo.project || 'Unassigned';
      if (!acc[project]) {
        acc[project] = { total: 0, completed: 0 };
      }
      acc[project].total += 1;
      if (todo.completed) acc[project].completed += 1;
      return acc;
    }, {});

    const byPriority = {
      high: todos.filter(t => t.priority === 'high').length,
      medium: todos.filter(t => t.priority === 'medium').length,
      low: todos.filter(t => t.priority === 'low').length,
    };

    return { total, completed, pending, overdue, byClient, byProject, byPriority };
  }, [todos]);

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Overdue</p>
          <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
        </div>
      </div>

      {/* Completion Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">Overall Completion</h3>
          <span className="text-sm font-medium text-indigo-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {stats.completed} of {stats.total} tasks completed
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* By Client */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-lg">👤</span> Tasks by Client
          </h3>
          {Object.keys(stats.byClient).length === 0 ? (
            <p className="text-sm text-gray-400 italic">No clients yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.byClient).map(([client, data]) => {
                const rate = Math.round((data.completed / data.total) * 100);
                return (
                  <div key={client}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[60%]">{client}</span>
                      <span className="text-xs text-gray-400">
                        {data.completed}/{data.total} ({rate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* By Project */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-lg">📁</span> Tasks by Project
          </h3>
          {Object.keys(stats.byProject).length === 0 ? (
            <p className="text-sm text-gray-400 italic">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.byProject).map(([project, data]) => {
                const rate = Math.round((data.completed / data.total) * 100);
                return (
                  <div key={project}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[60%]">{project}</span>
                      <span className="text-xs text-gray-400">
                        {data.completed}/{data.total} ({rate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="text-lg">🎯</span> Priority Breakdown
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
            <p className="text-2xl font-bold text-red-600">{stats.byPriority.high}</p>
            <p className="text-xs text-red-500 font-medium mt-1">High</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-2xl font-bold text-yellow-600">{stats.byPriority.medium}</p>
            <p className="text-xs text-yellow-500 font-medium mt-1">Medium</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
            <p className="text-2xl font-bold text-green-600">{stats.byPriority.low}</p>
            <p className="text-xs text-green-500 font-medium mt-1">Low</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;