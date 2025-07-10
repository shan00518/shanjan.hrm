
'use client'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
  </div>
);


interface Project {
  id: string
  name: string
}

interface Client {
  id: string
  name: string
}

interface Employee {
  id: string
  name: string
}

interface Invoice {
  _id: string
  total: number
  remainingAmount: number
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [totalInvoicesAmount, setTotalInvoicesAmount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
       toast.loading('Loading dashboard data...')

        
        // Fetch project data
        const projectRes = await fetch('/api/project/fetch')
        if (!projectRes.ok) throw new Error('Failed to fetch projects')
        const projectData = await projectRes.json()
        setProjects(projectData.projects || [])
        toast.success('Projects loaded successfully')


        const clientRes = await fetch('/api/client/fetch')
        if (!clientRes.ok) throw new Error('Failed to fetch clients')
        const clientData = await clientRes.json()
        setClients(clientData.clients || [])
       toast.success('Clients loaded successfully')


        const employeeRes = await fetch('/api/employee/fetch')
        if (!employeeRes.ok) throw new Error('Failed to fetch employees')
        const employeeData = await employeeRes.json()
        setEmployees(employeeData.employees || [])
       toast.success('Employees loaded successfully')


        const invoiceRes = await fetch('/api/invoice/list')
        if (!invoiceRes.ok) throw new Error('Failed to fetch invoices')
        const invoiceData = await invoiceRes.json()
        setInvoices(invoiceData.invoices || [])
        toast.success('Invoices loaded successfully')

        
        const total = invoiceData.invoices.reduce((sum: number, invoice: Invoice) => sum + invoice.total, 0)
        setTotalInvoicesAmount(total)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
  return (
    <section className="relative w-full px-4 sm:px-6 mt-20 xl:pl-48 lg:pl-60 md:pl-56 overflow-y-hidden">
      <div className="xl:w-[90%] lg:w-[95%] md:w-[80%] mx-auto">
        <div className="space-y-6 text-center">
          <Spinner />
          <p className="text-gray-500 text-sm mt-2">Loading dashboard data...</p>
          <div className="animate-pulse mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


  if (error) {
    return (
      <section className="relative w-full px-4 sm:px-6 mt-20 xl:pl-48 lg:pl-60 md:pl-56 overflow-y-hidden">
        <div className="xl:w-[90%] lg:w-[95%] md:w-[80%] mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading dashboard data: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full px-4 sm:px-6 mt-20 xl:pl-48 lg:pl-60 md:pl-56 overflow-y-hidden">
      <div className="xl:w-[90%] lg:w-[95%] md:w-[80%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Active Clients</div>
            <div className="flex items-center">
              <h1 className="text-lg sm:text-2xl">{clients.length}</h1>
              <p className="text-gray-500 ml-2 text-sm">+12%</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Active Projects</div>
            <div className="flex items-center">
              <h1 className="text-lg sm:text-2xl">{projects.length}</h1>
              <p className="text-gray-500 ml-2 text-sm">+5%</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Total Invoices</div>
            <div className="flex items-center">
              <h1 className="text-md sm:text-2xl">${totalInvoicesAmount}</h1>
              <p className="text-gray-500 ml-2 text-sm">0%</p>
            </div>
          </div>

          
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Employees</div>
            <div className="flex items-center">
              <h1 className="text-md sm:text-2xl">{employees.length}</h1>
              <p className="text-gray-500 ml-2 text-sm">+8%</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-700 text-sm">Recent Clients</div>
              {/* <button className="text-blue-600 text-sm">View All</button> */}
            </div>
            <div className="space-y-4">
              {clients.length > 0 ? (
                clients.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          {client.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-gray-800 text-md sm:text-sm">{client.name}</h2>
                        <p className="text-gray-500 text-xs">Client</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600">Active</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm">No clients found</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-700 text-sm">Recent Projects</div>
              {/* <button className="text-blue-600 text-sm">View All</button> */}
            </div>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-xs text-gray-500">P</span>
                      </div>
                      <div>
                        <h2 className="text-gray-800 text-md sm:text-sm">{project.name}</h2>
                        <p className="text-gray-500 text-xs">Project</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600">Active</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm">No projects found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



