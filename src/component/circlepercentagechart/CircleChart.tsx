import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./CirclePercentage.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularChartProps {
  percentageCompleted: number;
  percentageRemaining: number;
  type?: string;
  score?: number;
}

const CircularChart: React.FC<CircularChartProps> = ({
  percentageCompleted,
  percentageRemaining,
  type,
  score,
}) => {
  const getBackgroundColor = (percentage: number, type: string) => {
    let color;
    if (percentage >= 81) {
      color = "#4caf50";
    } else if (percentage >= 61) {
      color = "#8bc34a";
    } else if (percentage >= 46) {
      color = "#ffc107";
    } else if (percentage >= 21) {
      color = "#ff9800";
    } else {
      color = "#f44336";
    }

    return type === "overview" ? [color, "#ffff"] : ["#09B96D", "#ffff"];
  };


  const getClassName = (percentage: number, type: string) => {
    if (type !== "overview") {
      return "remaining-percentage";
    }

    if (percentage >= 81) {
      return "remaining-percentage";
    } else if (percentage >= 61) {
      return "remaining-percentage2";
    } else if (percentage >= 46) {
      return "remaining-percentage5";
    } else if (percentage >= 21) {
      return "remaining-percentage4";
    } else {
      return "remaining-percentage6";
    }
  };


  const dataOuter = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Progress",
        data: [percentageRemaining || score, percentageRemaining - 100],
        backgroundColor: getBackgroundColor(percentageRemaining, type || ''),
        hoverBackgroundColor: getBackgroundColor(percentageRemaining, type || ''),
        borderWidth: 0,
        borderRadius: 10,
      },
    ],
  };

  const dataInner = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Progress",
        data: [percentageCompleted, percentageCompleted - 100],
        backgroundColor: ["#0058EA", "#ffff"],
        hoverBackgroundColor: ["#0058EA", "#ffff"],
        borderWidth: 0,
        borderRadius: 10,
      },
    ],
  };

  const optionsOuter = {
    cutout: type === 'overview' ? "75%" : "85%",
    radius: "100%",
    responsive: true,
    rotation: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const optionsInner = {
    cutout: "85%",
    radius: "75%",
    responsive: true,
    rotation: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="circular-chart-container">
      <Doughnut data={dataOuter} options={optionsOuter} />
      {type === 'overview' ? '' :
        <div className="circular-chart-inner">
          <Doughnut data={dataInner} options={optionsInner} />
        </div>
      }
      <div className="circular-chart-label">
        <span
          className={getClassName(percentageRemaining, type || '')}>
          {percentageRemaining}%
        </span>

        <br />
        {type === 'overview' ? '' :
          <span className="completed-percentage">{percentageCompleted}%</span>}
      </div>
    </div>
  );
};

export default CircularChart;
