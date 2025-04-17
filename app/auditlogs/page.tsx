"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LogEntry = {
  _id: string;
  email: string;
  action: string;
  templateName: string;
  timestamp: string;
};

const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);


export default function AuditLogsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHydrated(true);
    if (status === "unauthenticated") {
      router.push("/signin");
    }

    if (status === "authenticated") {
      fetchLogs();
    }
  }, [status]);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/getauditlogs", { method: "GET" });
      if (!res.ok) return;

      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      if (data.logs) setLogs(data.logs);
    } catch (err) {
      console.error("Error parsing logs response:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hydrated) return null;

  const getFirstName = (email: string) => {
    const [prefix] = email.split("@");
    const [first] = prefix.split(".");
    return first.charAt(0).toUpperCase() + first.slice(1);
  };

  const countByUser = logs.reduce((acc, log) => {
    const name = getFirstName(log.email);
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(countByUser).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="flex flex-col h-screen bg-gray-500 text-white">
      {/* Top: Audit Logs Table (scrollable) */}
      <div className="h-1/2 overflow-y-auto p-6">
        <div className="bg-[#1e1e1e] border border-[#333] rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-[#333]">
            <h2 className="text-xl font-semibold">Audit Logs</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 px-6 py-3 text-sm font-semibold text-gray-300 bg-[#2a2a2a] border-b border-[#333]">
            <div>Who</div>
            <div>What</div>
            <div>When</div>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
          <ul className="divide-y divide-[#333] max-h-[50vh] overflow-y-auto">
            {logs.map((log) => (
              <li
                key={log._id}
                className="grid grid-cols-3 gap-4 px-6 py-3 text-sm items-center"
              >
                <div className="text-yellow-400 font-medium">{log.email}</div>
                <div>
                  <span className="text-green-400">{log.action}</span>{" "}
                  <span className="text-gray-400">on</span>{" "}
                  <span className="italic text-white">{log.templateName}</span>
                </div>
                <div className="text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
  
      {/* Bottom: Chart Section (fixed height) */}
      <div className="h-1/2 p-6">
  <div className="bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg p-6 h-full relative">
    <h3 className="text-lg font-semibold mb-4">Email Generation by User</h3>

    {isLoading ? (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
        <Spinner />
      </div>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap={50}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="name"
            stroke="#ccc"
            interval={0}
            tick={{
              fontSize: 16,
              fill: "#fff",
              dy: 12,
            }}
          />
          <YAxis stroke="#ccc" allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444",
              color: "#fff",
            }}
          />
          <Bar
            dataKey="count"
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
</div>
    </div>
  );
}
