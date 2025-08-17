import { Activity, Plus } from "lucide-react";

interface HeaderProps {
  setShowAddMonitor: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setShowAddMonitor }: HeaderProps) {
  return (
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
  );
}
