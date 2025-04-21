import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const CategoryChart = ({ transactions }) => {
  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#a78bfa",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 12,
          padding: 8,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue || 0;
            const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
            return `${label}: $${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Expenses by Category
      </h2>
      {Object.keys(categoryData).length > 0 ? (
        <div style={{ height: '300px' }}>
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-gray-600 text-center">No expenses to display.</p>
      )}
    </div>
  );
};

export default CategoryChart;