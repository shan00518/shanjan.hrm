'use client'
import Image from 'next/image'

const Dashboard = () => {
  return (
<section className=" relative w-full px-4 sm:px-6 mt-20  xl:pl-48 lg:pl-60 md:pl-56 overflow-y-hidden   ">
      <div className="xl:w-[90%] lg:w-[95%] md:w-[80%] mx-auto">
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Active Clients</div>
            <div className="flex items-center">
              <h1 className="text-lg sm:text-2xl">248</h1>
              <p className="text-gray-500 ml-2 text-sm">+12%</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Active Developers</div>
            <div className="flex items-center">
              <h1 className="text-lg sm:text-2xl">156</h1>
              <p className="text-gray-500 ml-2 text-sm">+5%</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Pending Invoices</div>
            <div className="flex items-center">
              <h1 className="text-md sm:text-2xl">$45,290</h1>
              <p className="text-gray-500 ml-2 text-sm">-2%</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="text-gray-700 text-xl sm:text-sm mb-2">Hours Logged</div>
            <div className="flex items-center">
              <h1 className="text-md sm:text-2xl">1,248</h1>
              <p className="text-gray-500 ml-2 text-sm">+8%</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Developers */}
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-700 text-sm">Recent Developers</div>
              <button className="text-blue-600 text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Darlene Robert", image: "/assets/Ellipse.png" },
                { name: "Mike Chin", image: "/assets/Ellipse1.png" },
                { name: "Sarah Wilson", image: "/assets/Ellipse2.png" },
              ].map((dev, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={dev.image} 
                      alt={dev.name} 
                      width={48} 
                      height={48} 
                      className="rounded-full size-6" 
                    />
                    <div>
                      <h2 className="text-gray-800 text-md sm:text-sm">{dev.name}</h2>
                      <p className="text-gray-500 text-xs">Full Stack Developer</p>
                    </div>
                  </div>
                  <span className="text-green-600 text-xs">Active</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-700 text-sm">Recent Invoices</div>
              <button className="text-blue-600 text-sm">View All</button>
            </div>
            <div className="text-gray-400 text-sm">No recent invoices available.</div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default Dashboard;