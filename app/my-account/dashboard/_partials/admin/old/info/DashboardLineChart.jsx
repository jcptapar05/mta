// components/MyLineChart.tsx
"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const DashboardLineChart = () => {
 return (
  <Card className="w-[100%]">
   <CardHeader>
    <CardTitle>Products</CardTitle>
   </CardHeader>
   <CardContent>
    <Line
     data={{
      labels: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07"],
      datasets: [
       {
        data: [100, 120, 115, 134, 168, 132, 200],
        backgroundColor: "purple",
       },
      ],
     }}
    />
   </CardContent>
  </Card>
 );
};

export default DashboardLineChart;
