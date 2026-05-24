import React, { useEffect, useState } from 'react';

import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
} from 'lucide-react';

import { DashboardLayout } from '../layouts/DashboardLayout';

import {
  Button,
  Modal,
  Input,
  Textarea,
  Select,
  Badge,
  Spinner,
  Alert,
} from '../components/ui';

import taskService from '../services/taskService';

import projectService from '../services/projectService';

import { formatDate } from '../utils/helpers';


// TASK CARD
const TaskCard = ({
  task,
  onEdit,
  onDelete,
}) => {

  return (

    <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 hover:border-white/20 hover:shadow-xl transition-all duration-300">

      {/* TOP */}
      <div className="flex items-start justify-between mb-4">

        <h4 className="font-bold text-white text-lg flex-1 pr-4">
          {task.title}
        </h4>

        <div className="flex items-center gap-3">

          <button
            onClick={() => onEdit(task)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-red-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>


      {/* DESCRIPTION */}
      {task.description && (

        <p className="text-white/70 text-sm mb-5 leading-relaxed">
          {task.description}
        </p>

      )}


      {/* FOOTER */}
      <div className="flex items-center justify-between">

        <Badge
          variant={
            task.priority === 'high'
              ? 'error'
              : task.priority === 'medium'
              ? 'warning'
              : 'info'
          }
        >
          {task.priority}
        </Badge>

        {task.dueDate && (

          <span className="text-xs text-white/60 flex items-center gap-1">

            <Calendar size={12} />

            {formatDate(task.dueDate)}

          </span>

        )}

      </div>

    </div>
  );
};


// COLUMN
const KanbanColumn = ({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => (

  <div className="bg-gradient-to-br from-[#0f172a]/90 to-[#111827]/90 border border-[#1e293b] rounded-2xl p-5">

    {/* HEADER */}
    <div className="flex items-start justify-between mb-6">

      <div>

        <h3 className="text-2xl font-bold text-white mb-1">
          {title}
        </h3>

        <p className="text-white/70 text-sm font-medium">
          {tasks.length} tasks
        </p>

      </div>

      <button
        onClick={() => onAddTask(null, status)}
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
      >
        <Plus size={20} />
      </button>

    </div>


    {/* TASKS */}
    <div className="space-y-4">

      {tasks.length === 0 ? (

        <div className="flex items-center justify-center py-12 text-white/50 text-sm border border-dashed border-secondary-700 rounded-xl">

          No tasks

        </div>

      ) : (

        tasks.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />

        ))

      )}

    </div>

  </div>
);


// MAIN
export const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    project: '',
    dueDate: '',
  });


  const statusColumns = [
    { status: 'todo', title: 'To Do' },
    { status: 'in-progress', title: 'In Progress' },
    { status: 'review', title: 'Review' },
    { status: 'done', title: 'Done' },
  ];


  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      setLoading(true);

      setError(null);

      const response =
        await taskService.getAll();

      setTasks(
        response.data.tasks || []
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Failed to fetch tasks'
      );

    } finally {

      setLoading(false);

    }
  };


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const response =
        await projectService.getAll();

      setProjects(
        response.data.projects || []
      );

    } catch (err) {

      console.error(err);

    }
  };


  // OPEN MODAL
  const handleOpenModal = (
    task = null,
    status = null
  ) => {

    if (task) {

      setEditingTask(task);

      setFormData({
        title: task.title || '',
        description:
          task.description || '',
        status: task.status || 'todo',
        priority:
          task.priority || 'medium',
        project:
          task.project?._id || '',
        dueDate:
          task.dueDate
            ? task.dueDate.split('T')[0]
            : '',
      });

    } else {

      setEditingTask(null);

      setFormData({
        title: '',
        description: '',
        status: status || 'todo',
        priority: 'medium',
        project: '',
        dueDate: '',
      });

    }

    setIsModalOpen(true);
  };


  // CLOSE MODAL
  const handleCloseModal = () => {

    setIsModalOpen(false);

    setEditingTask(null);

    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      project: '',
      dueDate: '',
    });
  };


  // HANDLE INPUT
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingTask) {

        await taskService.update(
          editingTask._id,
          formData
        );

      } else {

        await taskService.create(
          formData
        );

      }

      handleCloseModal();

      await fetchTasks();

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Failed to save task'
      );
    }
  };


  // DELETE
  const handleDelete = async (
    taskId
  ) => {

    if (
      window.confirm(
        'Are you sure you want to delete this task?'
      )
    ) {

      try {

        await taskService.delete(taskId);

        await fetchTasks();

      } catch (err) {

        setError(
          err.response?.data?.message ||
          'Failed to delete task'
        );
      }
    }
  };


  // OPTIONS
  const projectOptions = projects.map(
    (p) => ({
      value: p._id,
      label: p.title,
    })
  );


  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];


  const statusOptions =
    statusColumns.map((col) => ({
      value: col.status,
      label: col.title,
    }));


  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-96">

          <Spinner
            size="lg"
            className="text-primary-500"
          />

        </div>

      </DashboardLayout>
    );
  }


  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white mb-3">
          Tasks
        </h1>

        <p className="text-white/70 text-lg">
          Manage and organize your tasks
        </p>

      </div>


      {/* ERROR */}
      {error && (

        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />

      )}


      {/* BOARD */}
      <div className="space-y-6">

        {statusColumns.map((col) => {

          const columnTasks =
            tasks.filter(
              (t) =>
                t.status === col.status
            );

          return (

            <KanbanColumn
              key={col.status}
              title={col.title}
              status={col.status}
              tasks={columnTasks}
              onAddTask={handleOpenModal}
              onEditTask={handleOpenModal}
              onDeleteTask={handleDelete}
            />

          );
        })}

      </div>


      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingTask
            ? 'Edit Task'
            : 'Create New Task'
        }
        size="md"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              {editingTask
                ? 'Save Changes'
                : 'Create Task'}
            </Button>
          </>
        }
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            label="Task Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
          />

          <Select
            label="Project"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
            options={projectOptions}
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={statusOptions}
          />

          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            options={priorityOptions}
          />

          <Input
            label="Due Date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
          />

        </form>

      </Modal>

    </DashboardLayout>
  );
};