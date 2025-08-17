import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Edit,
  MapPin,
  Pause,
  Play,
  RefreshCw,
  Server,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MoniterStats() {
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

  const responseTimeData = [
    { time: "00:00", mainSite: 245, api: 189, cdn: 156, admin: 892 },
    { time: "04:00", mainSite: 267, api: 201, cdn: 143, admin: 756 },
    { time: "08:00", mainSite: 289, api: 234, cdn: 167, admin: 945 },
    { time: "12:00", mainSite: 312, api: 198, cdn: 189, admin: 698 },
    { time: "16:00", mainSite: 298, api: 176, cdn: 145, admin: 823 },
    { time: "20:00", mainSite: 276, api: 167, cdn: 134, admin: 734 },
    { time: "23:59", mainSite: 245, api: 189, cdn: 0, admin: 892 },
  ];

  const uptimeData = [
    { date: "Mon", uptime: 99.9 },
    { date: "Tue", uptime: 99.8 },
    { date: "Wed", uptime: 98.2 },
    { date: "Thu", uptime: 99.9 },
    { date: "Fri", uptime: 99.7 },
    { date: "Sat", uptime: 98.5 },
    { date: "Sun", uptime: 99.1 },
  ];

  const [selectedMonitor, setSelectedMonitor] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "up":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "down":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "up":
        return <CheckCircle size={16} />;
      case "down":
        return <WifiOff size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      default:
        return <Wifi size={16} />;
    }
  };

  const deleteMonitor = (id) => {
    setMonitors(monitors.filter((m) => m.id !== id));
  };

  const toggleMonitor = (id) => {
    setMonitors(
      monitors.map((m) =>
        m.id === id
          ? {
              ...m,
              isActive: !m.isActive,
              status: !m.isActive ? m.status : "paused",
            }
          : m
      )
    );
  };
  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Server size={20} />
              <span>Active Monitors</span>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                {monitors.length} total
              </span>
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live monitoring</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-1 hover:text-white transition-colors"
              >
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Service
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Uptime
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Response
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Last Check
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Region
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {monitors.map((monitor) => (
                <tr
                  key={monitor.id}
                  className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          monitor.isActive ? "bg-green-400" : "bg-gray-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-white flex items-center space-x-2">
                          <span>{monitor.name}</span>
                          {!monitor.isActive && (
                            <span className="bg-gray-600 text-gray-300 px-2 py-0.5 rounded text-xs">
                              Paused
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          {monitor.url}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {monitor.method} • {monitor.interval}s interval
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        monitor.status
                      )}`}
                    >
                      {getStatusIcon(monitor.status)}
                      <span className="capitalize">{monitor.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">
                        {monitor.uptime}%
                      </span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            monitor.uptime > 99
                              ? "bg-green-400"
                              : monitor.uptime > 95
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${monitor.uptime}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${
                        monitor.status === "down"
                          ? "text-gray-500"
                          : monitor.responseTime > 500
                          ? "text-yellow-400"
                          : monitor.responseTime > 1000
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {monitor.status === "down"
                        ? "--"
                        : `${monitor.responseTime}ms`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {monitor.lastCheck}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin size={12} />
                      <span>{monitor.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleMonitor(monitor.id)}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title={
                          monitor.isActive
                            ? "Pause monitoring"
                            : "Resume monitoring"
                        }
                      >
                        {monitor.isActive ? (
                          <Pause size={16} />
                        ) : (
                          <Play size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedMonitor(monitor)}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="View details"
                      >
                        <BarChart3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          /* Edit functionality */
                        }}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Edit monitor"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteMonitor(monitor.id)}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete monitor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMonitor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedMonitor.name}
                </h3>
                <p className="text-gray-400">{selectedMonitor.url}</p>
              </div>
              <button
                onClick={() => setSelectedMonitor(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-white mb-3">
                    Current Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <div
                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          selectedMonitor.status
                        )}`}
                      >
                        {getStatusIcon(selectedMonitor.status)}
                        <span className="capitalize">
                          {selectedMonitor.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-white font-medium">
                        {selectedMonitor.uptime}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span
                        className={`font-medium ${
                          selectedMonitor.status === "down"
                            ? "text-gray-500"
                            : selectedMonitor.responseTime > 500
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {selectedMonitor.status === "down"
                          ? "--"
                          : `${selectedMonitor.responseTime}ms`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Check:</span>
                      <span className="text-white">
                        {selectedMonitor.lastCheck}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-white mb-3">
                    Configuration
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Method:</span>
                      <span className="text-white font-medium">
                        {selectedMonitor.method}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Check Interval:</span>
                      <span className="text-white">
                        {selectedMonitor.interval}s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timeout:</span>
                      <span className="text-white">
                        {selectedMonitor.timeout}s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Region:</span>
                      <span className="text-white">
                        {selectedMonitor.region}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-md font-medium text-white mb-3">
                  Response Time History
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={
                        selectedMonitor.name === "Main Website"
                          ? "mainSite"
                          : selectedMonitor.name === "API Server"
                          ? "api"
                          : selectedMonitor.name === "CDN Endpoint"
                          ? "cdn"
                          : "admin"
                      }
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-md font-medium text-white mb-3">
                Recent Check Results
              </h4>
              <div className="space-y-2">
                {[
                  {
                    time: "2 min ago",
                    status: "success",
                    response: selectedMonitor.responseTime,
                  },
                  {
                    time: "4 min ago",
                    status: "success",
                    response: selectedMonitor.responseTime + 23,
                  },
                  {
                    time: "6 min ago",
                    status: "success",
                    response: selectedMonitor.responseTime - 15,
                  },
                  {
                    time: "8 min ago",
                    status:
                      selectedMonitor.status === "down" ? "failed" : "success",
                    response:
                      selectedMonitor.status === "down"
                        ? 0
                        : selectedMonitor.responseTime + 45,
                  },
                ].map((check, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      {check.status === "success" ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <WifiOff className="text-red-400" size={16} />
                      )}
                      <span className="text-gray-400">{check.time}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm ${
                          check.status === "success"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {check.status === "success" ? "Success" : "Failed"}
                      </span>
                      <span className="text-white font-mono">
                        {check.response === 0 ? "--" : `${check.response}ms`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={() => setSelectedMonitor(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  /* Edit functionality */
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit size={16} />
                <span>Edit Monitor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
