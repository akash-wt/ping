import { AlertTriangle } from "lucide-react";

type Props = {
  warningCount: number;
};

export default function Warning({ warningCount }: Props) {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-yellow-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">Warnings</p>
          <p className="text-3xl font-bold text-yellow-400">{warningCount}</p>
          <p className="text-xs text-yellow-400/70 mt-1">Performance issues</p>
        </div>
        <AlertTriangle className="text-yellow-400" size={28} />
      </div>
    </div>
  );
}
