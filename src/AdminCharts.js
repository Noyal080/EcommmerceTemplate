import React, { useEffect } from "react";
import c3 from "c3";
import "c3/c3.css";
const AdminCharts = ({
  id,
  chartStyle,
  data,
  chartType,
  height,
  width,
  title,
  categories,
  colors,
  currency,
}) => {
  useEffect(() => {
    const chart = c3.generate({
      bindto: `#${id}`,
      size: {
        height,
        width,
      },
      data: {
        columns: data,
        type: chartType,
        labels: {
          format: function (value) {
            return `${currency} ${value}`;
          },
        },
      },
      donut: {
        title: title,
      },

      bar: {
        width: {
          ratio: 0.5,
        },
      },
      axis: {
        x: {
          type: "category",
          categories,
        },
      },
      color: {
        pattern: colors,
      },
    });
    return () => {
      chart.destroy();
    };
  }, [data, categories, chartType, height, width, colors, id]);

  return <div className="chart" id={id} style={{ ...chartStyle }}></div>;
};

export default AdminCharts;
