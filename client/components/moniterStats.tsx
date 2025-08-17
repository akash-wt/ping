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
                      <div className="text-sm text-gray-400">{monitor.url}</div>
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
                <td className="px-6 py-4 text-gray-400">{monitor.lastCheck}</td>
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
  );
}
