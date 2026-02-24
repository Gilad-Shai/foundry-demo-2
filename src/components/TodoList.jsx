import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <p className="text-gray-500 text-lg">No tasks found</p>
        <p className="text-gray-400 text-sm mt-1">Add a new task or adjust your filters</p>
      </div>
    );
  }

  const groupedByClient = todos.reduce((acc, todo) => {
    const client = todo.client || 'No Client';
    if (!acc[client]) {
      acc[client] = {};
    }
    const project = todo.project || 'No Project';
    if (!acc[client][project]) {
      acc[client][project] = [];
    }
    acc[client][project].push(todo);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedByClient).map(([client, projects]) => (
        <div key={client} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <h2 className="font-bold text-gray-800 text-lg">{client}</h2>
              <span className="ml-auto text-sm text-gray-500">
                {Object.values(projects).flat().length} task{Object.values(projects).flat().length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {Object.entries(projects).map(([project, projectTodos]) => (
              <div key={project} className="px-6 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">📁</span>
                  <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide">{project}</h3>
                  <span className="text-xs text-gray-400">
                    ({projectTodos.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {projectTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;