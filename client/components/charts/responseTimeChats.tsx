import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the shape of one response-time record
export interface ResponseTimeDataProps {
  time: string;
  mainSite: number;
  api: number;
  cdn: number;
  admin: number;
}

interface ResponseTimeChartProps {
  responseTimeData: ResponseTimeDataProps[];
}

// {responseTimeData,}: ResponseTimeChartProps

export default function ResponseTimeChart() {
  const responseTimeData: ResponseTimeDataProps[] = [
    { time: "00:00", mainSite: 245, api: 189, cdn: 156, admin: 892 },
    { time: "04:00", mainSite: 267, api: 201, cdn: 143, admin: 756 },
    { time: "08:00", mainSite: 289, api: 234, cdn: 167, admin: 945 },
    { time: "12:00", mainSite: 312, api: 198, cdn: 189, admin: 698 },
    { time: "16:00", mainSite: 298, api: 176, cdn: 145, admin: 823 },
    { time: "20:00", mainSite: 276, api: 167, cdn: 134, admin: 734 },
    { time: "23:59", mainSite: 245, api: 189, cdn: 0, admin: 892 },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <TrendingUp size={20} />
        <span>Response Time (24h)</span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={responseTimeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="mainSite"
            stroke="#10B981"
            strokeWidth={2}
            name="Main Site"
          />
          <Line
            type="monotone"
            dataKey="api"
            stroke="#3B82F6"
            strokeWidth={2}
            name="API"
          />
          <Line
            type="monotone"
            dataKey="cdn"
            stroke="#F59E0B"
            strokeWidth={2}
            name="CDN"
          />
          <Line
            type="monotone"
            dataKey="admin"
            stroke="#EF4444"
            strokeWidth={2}
            name="Admin"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
