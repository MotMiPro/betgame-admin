import React from "react";
import { Pie, Line } from "@ant-design/charts";

export function AdminPieCharts({ dataChart }) {
  var config = {
    appendPadding: 10,
    data: dataChart ?? [],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref) {
        var percent = _ref.percent;
        return "".concat((percent * 100).toFixed(0), "%");
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return <Pie {...config} />;
}

export function AdminLineCharts({ dataChart }) {
  var config = {
    data: dataChart ?? [],
    padding: "auto",
    xField: "date",
    yField: "value",
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };
  return <Line {...config} />;
}
