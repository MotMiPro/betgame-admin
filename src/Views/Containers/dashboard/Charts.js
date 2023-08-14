import React from "react";
import { Pie } from "@ant-design/charts";

function Charts() {
  var data = [
    {
      type: "blue",
      value: 27,
    },
    {
      type: "green",
      value: 25,
    },
    {
      type: "brow",
      value: 18,
    },
    {
      type: "yellow",
      value: 15,
    },
    {
      type: "purple",
      value: 10,
    },
    {
      type: "sky",
      value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
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

export default Charts;
