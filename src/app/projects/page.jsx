"use client";

import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProjectsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]); // State for clients list
  const [showEditModal, setShowEditModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("in_progress");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editProjectData, setEditProjectData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    startDate: '',
    endDate: '',
    status: 'in_progress',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectsRes = await fetch('/api/project/list');
        const projectsData = await projectsRes.json();
        setProjects(projectsData.projects);
        
        // Fetch clients
        const clientsRes = await fetch('/api/client/list');
        const clientsData = await clientsRes.json();
        setClients(clientsData.clients);
        
        toast.success("Data loaded successfully");
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);
  
  const resetForm = () => {
    setClient("");
    setName("");
    setDescription("");
    setStatus("in_progress");
    setPrice("");
    setStartDate("");
    setEndDate("");
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    toast.info('Creating new project...');

    // Basic validation
    if (!client || !name?.trim() || !startDate?.trim()) {
      toast.error("Please fill in all required fields: client, name, and start date.");
      setAddLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client,
          employees: [], // You can modify this to select employees if needed
          name,
          description,
          price: Number(price),
          startDate,
          endDate,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      setProjects((prev) => [...prev, data.project]);
      resetForm();
      setShowAddModal(false);
      toast.success(`Project "${data.project.name}" created successfully!`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(error.message || "Failed to create project");
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    
    try {
      const res = await fetch(`/api/project/update/${editProjectData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editProjectData.name,
          description: editProjectData.description,
          price: Number(editProjectData.price),
          startDate: editProjectData.startDate,
          endDate: editProjectData.endDate,
          status: editProjectData.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      setProjects(prev => 
        prev.map(project => 
          project._id === editProjectData.id ? data.project : project
        )
      );
      setShowEditModal(false);
      toast.success(`Project updated: ${data.project.name}`);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(error.message || "Failed to update project");
    } finally {
      setEditLoading(false);
    }
  };

  const openEditModal = (project) => {
    setEditProjectData({
      id: project._id,
      name: project.name,
      description: project.description,
      price: project.price.toString(),
      startDate: project.startDate.split('T')[0],
      endDate: project.endDate ? project.endDate.split('T')[0] : '',
      status: project.status,
    });
    setShowEditModal(true);
  };

  const handleDeleteProject = async () => {
    if (!deleteTarget) return;
    
    try {
      const res = await fetch(`/api/project/delete/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete project");
      }

      setProjects(prev => prev.filter(project => project._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.message || "Failed to delete project");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'in_progress': { text: 'In Progress', class: 'bg-blue-100 text-blue-700' },
      'pending': { text: 'Pending', class: 'bg-yellow-100 text-yellow-700' },
      'completed': { text: 'Completed', class: 'bg-green-100 text-green-700' }
    };
    
    const statusInfo = statusMap[status] || { text: status, class: 'bg-gray-100 text-gray-700' };
    
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="flex w-full md:w-[100%]">
      <aside className="w-[15%] bg-gray-100 hidden md:block p-4">
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="absolute w-[97%] md:w-[69%] lg:w-[73%] xl:w-[80%] ml-[-10px] border-[1px] rounded-lg px-6 py-8 xl:mx-auto mt-[100px] md:ml-[190px] lg:ml-[240px] xl:ml-60">
        <div className="flex flex-row md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="bg-[#192232] text-white px-4 py-1.5 rounded-lg hover:bg-[#192443] transition"
          >
            Add Project
          </button>
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-2">
                <select
                  className="border p-2 rounded w-full"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Project Name"
                  className="border p-2 rounded w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="border p-2 rounded w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  className="border p-2 rounded w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <input
                  type="date"
                  placeholder="End Date"
                  className="border p-2 rounded w-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <select
                  className="border p-2 rounded w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowAddModal(false);
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="bg-[#192443] text-white px-4 py-2 rounded hover:bg-[#0f1a31]"
                  >
                    {addLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Edit Project</h2>
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="border p-2 rounded w-full"
                  value={editProjectData.name}
                  onChange={(e) =>
                    setEditProjectData({ ...editProjectData, name: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Description"
                  className="border p-2 rounded w-full"
                  value={editProjectData.description}
                  onChange={(e) =>
                    setEditProjectData({ ...editProjectData, description: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded w-full"
                  value={editProjectData.price}
                  onChange={(e) =>
                    setEditProjectData({ ...editProjectData, price: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  className="border p-2 rounded w-full"
                  value={editProjectData.startDate}
                  onChange={(e) =>
                    setEditProjectData({ ...editProjectData, startDate: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  placeholder="End Date"
                  className="border p-2 rounded w-full"
                  value={editProjectData.endDate}
                  onChange={(e) =>
                    setEditProjectData({ ...editProjectData, endDate: e.target.value })
                  }
                />
                <select
                  className="border p-2 rounded w-full"
                  value={editProjectData.status}
                  onChange={(e) =>
                    setEditProjectData({ ...editProjectData, status: e.target.value })
                  }
                  required
                >
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="bg-[#192443] text-white px-4 py-2 rounded hover:bg-[#0f1a31]"
                  >
                    {editLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[400px] text-center">
              <h2 className="text-lg font-semibold mb-4">Delete Project</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.name}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Project Name</th>
                <th className="p-3 border-b">Client</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Start Date</th>
                <th className="p-3 border-b">End Date</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                const projectClient = clients.find(c => c._id === project.client);
                return (
                  <tr key={project._id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{project.name}</td>
                    <td className="p-3 border-b">
                      {projectClient ? projectClient.name : 'N/A'}
                    </td>
                    <td className="p-3 border-b">{project.description}</td>
                    <td className="p-3 border-b">${project.price}</td>
                    <td className="p-3 border-b">{formatDate(project.startDate)}</td>
                    <td className="p-3 border-b">{formatDate(project.endDate)}</td>
                    <td className="p-3 border-b">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="p-3 border-b">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-[#192232] hover:text-[#192443]"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(project)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}