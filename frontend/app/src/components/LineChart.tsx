import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const LineChart: React.FC<LineChartProps> = ({ worksByYear }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // データとオプションの設定
  const data = {
    labels: Object.keys(worksByYear), // X軸のラベル
    datasets: [
      {
        label: "作品数",
        data: Object.values(worksByYear), // 各ラベルに対応するデータ
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.8)",
        borderWidth: 10,
        tension: 0.1,
      },
    ],
  };

  // グラフのオプション
  const options = {
    scales: {
      x: {
        type: "category", // X軸をカテゴリタイプとして設定
        ticks: {
          font: {
            size: 20, // X軸のティックのフォントサイズを20pxに設定
          },
        },
      },
      y: {
        beginAtZero: true, // Y軸の開始点を0からに設定
        ticks: {
          font: {
            size: 20, // Y軸のティックのフォントサイズを20pxに設定
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // 凡例のフォントサイズを20pxに設定
          },
        },
      },
      title: {
        display: true,
        text: "出演作", // 必要に応じてグラフのタイトルを設定
        font: {
          size: 22, // タイトルのフォントサイズを22pxに設定
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
