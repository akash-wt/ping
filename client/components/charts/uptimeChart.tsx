import { BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface UptimeDataProps {
  date: string;
  uptime: number;
}

interface UptimeChartProps {
  uptimeData: UptimeDataProps[];
}

//{ uptimeData }: UptimeChartProps

export default function UptimeChart() {
  const uptimeData: UptimeDataProps[] = [
    { date: "Mon", uptime: 99.9 },
    { date: "Tue", uptime: 99.8 },
    { date: "Wed", uptime: 98.2 },
    { date: "Thu", uptime: 99.9 },
    { date: "Fri", uptime: 99.7 },
    { date: "Sat", uptime: 98.5 },
    { date: "Sun", uptime: 99.1 },
  ];
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <BarChart3 size={20} />
        <span>Weekly Uptime</span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={uptimeData}>
          <defs>
            <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#6B7280"
            domain={[95, 100]}
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #10B981",
              borderRadius: "12px",
              color: "#fff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
            formatter={(value) => [`${value}%`, "Uptime"]}
            labelStyle={{ color: "#10B981" }}
          />
          <Area
            type="monotone"
            dataKey="uptime"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#uptimeGradient)"
            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              stroke: "#10B981",
              strokeWidth: 2,
              fill: "#1F2937",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
