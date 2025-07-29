
'use client'
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ClientsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true); // For initial data loading
  const [deleting, setDeleting] = useState(false); // For delete operation

  const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
  </div>
);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editClientData, setEditClientData] = useState({
    id: '',
    clientName: '',
    email: '',
    phone: '',
    status: '',
    avatar: null,
    avatarPreview: '',
  });

  useEffect(() => {
    const fetchClients = async() => {
      try {
        setLoading(true);
        const res = await fetch('/api/client/list', {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log('fetching clients', data);
        setClients(data.clients);
        toast.success('Clients loaded successfully');
                await new Promise((resolve) => setTimeout(resolve, 1200)); 

      } catch (error) {
        console.error('An error occurred during fetching clients:', error)
        toast.error(error.message || 'failed to load clients');
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, [])

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setStatus("");
    setAvatar(null);
    setAvatarPreview("");
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    setAddLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("status", status);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await fetch("/api/client/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setClients((prev) => [...prev, data.client]);
      resetForm();
      setShowAddModal(false);
      toast.success("Client added successfully!");

    } catch (error) {
      console.error("Error creating client:", error);
      toast.error("Failed to create client.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    toast.info('Updating client...');

    try {
      const formData = new FormData();
      formData.append("name", editClientData.clientName);
      formData.append("email", editClientData.email);
      formData.append("phone", editClientData.phone);
      formData.append("status", editClientData.status);

      if (editClientData.avatar && typeof editClientData.avatar !== "string") {
        formData.append("avatar", editClientData.avatar);
      }

      const res = await fetch(`/api/client/update/${editClientData.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setClients((prev) =>
        prev.map((client) =>
          client._id === editClientData.id ? data.client : client
        )
      );

      setShowEditModal(false);
      setEditClientData({
        id: "",
        clientName: "",
        email: "",
        phone: "",
        status: "",
        avatar: null,
        avatarPreview: "",
      });

      toast.success("Client updated successfully!");

    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Failed to update client.");
    } finally {
      setEditLoading(false);
    }
  };

  const openEditModal = (client) => {
    setEditClientData({
      id: client._id,
      clientName: client.name,
      email: client.email,
      phone: client.phone,
      status: client.status || '',
      avatar: client.avatar?.url || null,
      avatarPreview: client.avatar?.url || '',
    });
    setShowEditModal(true);
  };

  const handleDeleteClient = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/client/delete/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete client");
      }

      setClients((prev) =>
        prev.filter((client) => client._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
      toast.success("Client deleted successfully!");

    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client.");
    } finally {
      setDeleting(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      toast.success('Avatar selected');
    }
  };

  const handleEditAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditClientData(prev => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file)
      }));
    }
  };

  return (
    <div className="flex w-[] md:w-[100%]">
      <aside className="w-[15%] hidden md:block p-4">
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="w-[100%] sm:w-[100%] md:w-[70%] lg:w-[73%] xl:w-[80%] 2xl:w-[82%] ml-[-10px] border-[1px] rounded-lg px-6 py-8 xl:mx-auto mt-[100px] md:ml-[100px] lg:ml-[90px] xl:ml-12 2xl:ml-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Clients</h1>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="bg-[#192232] text-white px-4 py-1.5 rounded-lg hover:bg-[#192443] transition flex items-center gap-2"
            disabled={loading}
          >
            Add Clients

          </button>
        </div>

        {/* Add Client Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Add New Client</h2>
              <form onSubmit={handleAddClient} className="space-y-2">
                <input
                  type="text"
                  placeholder="Client Name"
                  className="border p-2 rounded w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Client Email"
                  className="border p-2 rounded w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  className="border p-2 rounded w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <input
                  type="tel"
                  placeholder="Client Phone"
                  className="border p-2 rounded w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="flex items-center gap-4">
                  {avatarPreview && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="border p-2 rounded w-full"
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowAddModal(false);
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    disabled={addLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="bg-[#192443] text-white px-4 py-2 rounded hover:bg-[#0f1a31] flex items-center justify-center gap-2 min-w-[80px]"
                  >
                    {addLoading ? (
                      <>
                        <Spinner size={48} color="#ffffff" />
                        Saving...
                      </>
                    ) : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Client Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Edit Client</h2>
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Client Name"
                  className="border p-2 rounded w-full"
                  value={editClientData.clientName}
                  onChange={(e) =>
                    setEditClientData({ ...editClientData, clientName: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Client Email"
                  className="border p-2 rounded w-full"
                  value={editClientData.email}
                  onChange={(e) =>
                    setEditClientData({ ...editClientData, email: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Client Phone"
                  className="border p-2 rounded w-full"
                  value={editClientData.phone}
                  onChange={(e) =>
                    setEditClientData({ ...editClientData, phone: e.target.value })
                  }
                />
                <select
                  className="border p-2 rounded w-full"
                  value={editClientData.status}
                  onChange={(e) =>
                    setEditClientData({ ...editClientData, status: e.target.value })
                  }
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="flex items-center gap-4">
                  {(editClientData.avatarPreview || editClientData.avatar) && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage 
                        src={typeof editClientData.avatar === 'string' 
                          ? editClientData.avatar 
                          : editClientData.avatarPreview} 
                      />
                      <AvatarFallback>
                        {editClientData.clientName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="border p-2 rounded w-full"
                    onChange={handleEditAvatarChange}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditClientData({
                        id: '',
                        clientName: '',
                        email: '',
                        phone: '',
                        status: '',
                        avatar: null,
                        avatarPreview: '',
                      });
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="bg-[#192443] text-white px-4 py-2 rounded hover:bg-[#0f1a31] flex items-center justify-center gap-2 min-w-[100px]"
                  >
                    {editLoading ? (
                      <>
                        <Spinner size={48} color="#ffffff" />
                        Updating...
                      </>
                    ) : 'Update'}
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
              <h2 className="text-lg font-semibold mb-4">Delete Client</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.name}</strong>s profile?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteClient}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2 min-w-[120px]"
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <Spinner size={48} color="#ffffff" />
                      Deleting...
                    </>
                  ) : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Client Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner color="#192232" loading={loading} />
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No clients found</p>
            </div>
          ) : (
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b"></th>
                  <th className="p-3 border-b">Avatar</th>
                  <th className="p-3 border-b">Client Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Phone</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{}</td>
                    <td className="p-3 border-b">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={client.avatar?.url || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{client.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="p-3 border-b">{client.name}</td>
                    <td className="p-3 border-b">{client.email || 'N/A'}</td>
                    <td className="p-3 border-b">{client.phone || 'N/A'}</td>
                    <td className="p-3 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {client.status || 'inactive'}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(client)}
                          className="text-[#192232] hover:text-[#192443]"
                          disabled={loading}
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(client)}
                          className="text-red-600 hover:text-red-800"
                          disabled={loading}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}