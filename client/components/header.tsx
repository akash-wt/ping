import { Activity, Plus, X } from "lucide-react";
import { useState } from "react";



export default function Header() {
  const [monitors, setMonitors] = useState([
    {
      id: 1,
      name: "Main Website",
      url: "https://example.com",
      status: "up",
      uptime: 99.9,
      responseTime: 245,
      lastCheck: "2 min ago",
      region: "US East",
      method: "GET",
      interval: 60,
      timeout: 30,
      isActive: true,
    },
    {
      id: 2,
      name: "API Server",
      url: "https://api.example.com",
      status: "up",
      uptime: 99.8,
      responseTime: 189,
      lastCheck: "1 min ago",
      region: "EU West",
      method: "GET",
      interval: 30,
      timeout: 15,
      isActive: true,
    },
    {
      id: 3,
      name: "CDN Endpoint",
      url: "https://cdn.example.com",
      status: "down",
      uptime: 98.5,
      responseTime: 0,
      lastCheck: "5 min ago",
      region: "Asia Pacific",
      method: "HEAD",
      interval: 120,
      timeout: 30,
      isActive: true,
    },
    {
      id: 4,
      name: "Admin Panel",
      url: "https://admin.example.com",
      status: "warning",
      uptime: 99.1,
      responseTime: 892,
      lastCheck: "3 min ago",
      region: "US West",
      method: "GET",
      interval: 300,
      timeout: 60,
      isActive: false,
    },
  ]);

  const [newMonitor, setNewMonitor] = useState({
    name: "",
    url: "",
    method: "GET",
    interval: 60,
    timeout: 30,
    region: "US East",
  });

  const addMonitor = () => {
    if (!newMonitor.name || !newMonitor.url) return;

    const monitor = {
      id: monitors.length + 1,
      ...newMonitor,
      status: "up",
      uptime: 100,
      responseTime: Math.floor(Math.random() * 300) + 100,
      lastCheck: "Just now",
      isActive: true,
    };

    setMonitors([...monitors, monitor]);
    setNewMonitor({
      name: "",
      url: "",
      method: "GET",
      interval: 60,
      timeout: 30,
      region: "US East",
    });
    setShowAddMonitor(false);
  };
  const [showAddMonitor, setShowAddMonitor] = useState(false);
  return (
    <>
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Activity className="text-blue-400" size={28} />
            <h1 className="text-xl font-semibold">Ping Website</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddMonitor(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span>Add Monitor</span>
            </button>
          </div>
        </div>
      </header>

      {showAddMonitor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Add New Monitor</h3>
              <button
                onClick={() => setShowAddMonitor(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monitor Name
                </label>
                <input
                  type="text"
                  value={newMonitor.name}
                  onChange={(e) =>
                    setNewMonitor({ ...newMonitor, name: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Production API"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={newMonitor.url}
                  onChange={(e) =>
                    setNewMonitor({ ...newMonitor, url: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Method
                  </label>
                  <select
                    value={newMonitor.method}
                    onChange={(e) =>
                      setNewMonitor({ ...newMonitor, method: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="HEAD">HEAD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Region
                  </label>
                  <select
                    value={newMonitor.region}
                    onChange={(e) =>
                      setNewMonitor({ ...newMonitor, region: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="US East">US East</option>
                    <option value="US West">US West</option>
                    <option value="EU West">EU West</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Check Interval (seconds)
                  </label>
                  <input
                    type="number"
                    value={newMonitor.interval}
                    onChange={(e) =>
                      setNewMonitor({
                        ...newMonitor,
                        interval: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="30"
                    max="3600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    value={newMonitor.timeout}
                    onChange={(e) =>
                      setNewMonitor({
                        ...newMonitor,
                        timeout: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="5"
                    max="300"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddMonitor(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addMonitor}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Monitor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
