import { CheckCircle } from "lucide-react";

type Props = {
  upCount: number;
};

export default function ServiceUp({ upCount }: Props) {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-green-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">Services Up</p>
          <p className="text-3xl font-bold text-green-400">{upCount}</p>
          <p className="text-xs text-green-400/70 mt-1">
            All systems operational
          </p>
        </div>
        <CheckCircle className="text-green-400" size={28} />
      </div>
    </div>
  );
}
