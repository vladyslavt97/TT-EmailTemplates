"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type LogEntry = {
  _id: string;
  email: string;
  action: string;
  templateName: string;
  timestamp: string;
};

export default function AuditLogsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // prevents mismatch on first render

    if (status === "unauthenticated") {
      router.push("/signin");
    }

    if (status === "authenticated") {
      fetchLogs();
    }
  }, [status]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/getauditlogs", { method: "GET" });

      if (!res.ok) return;

      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      if (data.logs) setLogs(data.logs);
    } catch (err) {
      console.error("Error parsing logs response:", err);
    }
  };

  if (!hydrated) return null; // suppress render on first load

  return (
    <div className="p-4 text-white">
      <div className="bg-[#1e1e1e] border border-[#333] rounded-md max-h-[75vh] overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Audit Logs</h2>
        <ul className="space-y-2 text-sm">
          {logs.map((log) => (
            <li
              key={log._id}
              className="p-2 border-b border-[#333] flex flex-col gap-1"
            >
              <div>
                <span className="font-medium text-yellow-400">{log.email}</span>{" "}
                performed <span className="text-green-400">{log.action}</span>
              </div>
              <div>
                Template: <span className="italic">{log.templateName}</span>
              </div>
              <div className="text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
