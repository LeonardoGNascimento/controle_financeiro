import { useState } from "react";
import Chart from "react-google-charts";

interface Props {
  data: any;
  options: any;
}

export function Grafico({ data, options }: Props) {
  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        data={data}
        options={options}
      />
    </div>
  );
}
