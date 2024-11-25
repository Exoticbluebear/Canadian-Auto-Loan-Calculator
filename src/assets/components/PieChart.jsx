import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Array of colors for the segments
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MyPieChart = ({ data, data1 }) => {
  return (
    <PieChart width={310} height={300}>
      <Pie
        data={data}
        outerRadius={100} // Outer radius of the pie
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MyPieChart;
