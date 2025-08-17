import { WifiOff } from "lucide-react";

type Props = {
  downCount: number;
};

export default function ServiceDown({ downCount }: Props) {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-red-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">Services Down</p>
          <p className="text-3xl font-bold text-red-400">{downCount}</p>
          <p className="text-xs text-red-400/70 mt-1">
            {downCount > 0 ? "Immediate attention needed" : "No outages"}
          </p>
        </div>
        <WifiOff className="text-red-400" size={28} />
      </div>
    </div>
  );
}
