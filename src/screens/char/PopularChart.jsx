import  { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { year: "1950", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1970", population: 3.682 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "2010", population: 6.93 },
];

const PopularChart = () => {
  const [chartData] = useState(data);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Paper className="w-full max-w-xl p-4 shadow-lg rounded-lg bg-white">
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="population" argumentField="year" />
          <Title text="World Population Growth (1950-2010)" />
          <Animation />
        </Chart>
      </Paper>
    </div>
  );
};

export default PopularChart;
