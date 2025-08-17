import { Zap } from "lucide-react";

type Props = {
  avgResponseTime: number;
};

export default function AvgResponseTime({ avgResponseTime }: Props) {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">Avg Response</p>
          <p className="text-3xl font-bold text-blue-400">
            {avgResponseTime}ms
          </p>
          <p className="text-xs text-blue-400/70 mt-1">Last 24 hours</p>
        </div>
        <Zap className="text-blue-400" size={28} />
      </div>
    </div>
  );
}
