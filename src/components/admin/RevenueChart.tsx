"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { revenueByMonth } from "@/data/admin";

export default function RevenueChart({ data }: { data: typeof revenueByMonth }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BDA57A" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#BDA57A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#23232314" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#23232399" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: "#23232399" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `£${v}`}
        />
        <Tooltip
          formatter={(value: number) => [`£${value.toLocaleString()}`, "Revenue"]}
          contentStyle={{ border: "1px solid #23232320", borderRadius: 0, fontSize: 13 }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#69715E" strokeWidth={2} fill="url(#revenueFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
