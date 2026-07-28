"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TopProductsChart({ data }: { data: { title: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#23232314" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "#23232399" }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${v}`} />
        <YAxis type="category" dataKey="title" width={100} tick={{ fontSize: 12, fill: "#232323" }} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(value: number) => [`£${value.toLocaleString()}`, "Revenue"]}
          contentStyle={{ border: "1px solid #23232320", borderRadius: 0, fontSize: 13 }}
        />
        <Bar dataKey="revenue" fill="#BDA57A" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
