import React, { useEffect, useState } from 'react';

import {
  Plus,
  Edit2,
  Trash2,
  FolderOpen,
  Calendar,
} from 'lucide-react';

import { DashboardLayout } from '../layouts/DashboardLayout';

import {
  Card,
  Button,
  Modal,
  Input,
  Textarea,
  Badge,
  Spinner,
  Alert,
} from '../components/ui';

import projectService from '../services/projectService';

import { formatDate } from '../utils/helpers';


// PROJECT CARD
const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}) => (

  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300">

    <div className="flex-1">

      <div className="flex items-start justify-between mb-4">

        <div className="flex items-center gap-3 flex-1">

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <FolderOpen
              size={20}
              className="text-white"
            />
          </div>

          <div className="flex-1">

            <h3 className="font-bold text-secondary-900 dark:text-white truncate">
              {project.title}
            </h3>

            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              {project.description
                ? project.description.substring(0, 40) + '...'
                : 'No description'}
            </p>

          </div>
        </div>
      </div>

      {project.description && (

        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2">
          {project.description}
        </p>

      )}

    </div>

    <div className="space-y-3 pt-4 border-t border-secondary-200 dark:border-secondary-800">

      <div className="flex items-center justify-between">

        <span className="text-xs text-secondary-600 dark:text-secondary-400 flex items-center gap-1">

          <Calendar size={14} />

          {formatDate(
            project.createdAt || new Date()
          )}

        </span>

        <Badge variant="primary">
          {project.status || 'active'}
        </Badge>

      </div>

      <div className="flex gap-2">

        <Button
          variant="secondary"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => onEdit(project)}
        >
          <Edit2 size={16} />
          Edit
        </Button>

        <Button
          variant="danger"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => onDelete(project._id)}
        >
          <Trash2 size={16} />
          Delete
        </Button>

      </div>

    </div>

  </Card>
);


// MAIN COMPONENT
export const Projects = () => {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
  });


  // FETCH PROJECTS
  useEffect(() => {
    fetchProjects();
  }, []);


  const fetchProjects = async () => {

    try {

      setLoading(true);

      setError(null);

      const response =
        await projectService.getAll();

      setProjects(
        response.data.projects || []
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Failed to fetch projects'
      );

      console.error(
        'Failed to fetch projects:',
        err
      );

    } finally {

      setLoading(false);

    }
  };


  // OPEN MODAL
  const handleOpenModal = (
    project = null
  ) => {

    if (project) {

      setEditingProject(project);

      setFormData({
        title: project.title || '',
        description:
          project.description || '',
        status: project.status || 'active',
      });

    } else {

      setEditingProject(null);

      setFormData({
        title: '',
        description: '',
        status: 'active',
      });

    }

    setIsModalOpen(true);
  };


  // CLOSE MODAL
  const handleCloseModal = () => {

    setIsModalOpen(false);

    setEditingProject(null);

    setFormData({
      title: '',
      description: '',
      status: 'active',
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


  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingProject) {

        await projectService.update(
          editingProject._id,
          formData
        );

      } else {

        await projectService.create(
          formData
        );

      }

      handleCloseModal();

      await fetchProjects();

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Failed to save project'
      );
    }
  };


  // DELETE PROJECT
  const handleDelete = async (
    projectId
  ) => {

    if (
      window.confirm(
        'Are you sure you want to delete this project?'
      )
    ) {

      try {

        await projectService.delete(
          projectId
        );

        await fetchProjects();

      } catch (err) {

        setError(
          err.response?.data?.message ||
          'Failed to delete project'
        );
      }
    }
  };


  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Projects
          </h1>

          <p className="text-secondary-600 dark:text-secondary-400">
            Manage and organize your projects
          </p>

        </div>

        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          className="gap-2"
        >
          <Plus size={20} />
          New Project
        </Button>

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


      {/* LOADING */}
      {loading ? (

        <div className="flex items-center justify-center h-96">

          <Spinner
            size="lg"
            className="text-primary-500"
          />

        </div>

      ) : projects.length === 0 ? (

        <Card>

          <div className="text-center py-12">

            <FolderOpen
              size={48}
              className="mx-auto mb-4 text-secondary-300 dark:text-secondary-700"
            />

            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              No projects yet
            </h3>

            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Create your first project to get started
            </p>

            <Button
              variant="primary"
              onClick={() => handleOpenModal()}
            >
              Create Project
            </Button>

          </div>

        </Card>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}


      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingProject
            ? 'Edit Project'
            : 'Create New Project'
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
              {editingProject
                ? 'Save Changes'
                : 'Create Project'}
            </Button>

          </>
        }
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            label="Project Title"
            type="text"
            name="title"
            placeholder="Enter project title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <Textarea
            label="Description"
            name="description"
            placeholder="Enter project description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />

        </form>

      </Modal>

    </DashboardLayout>
  );
};