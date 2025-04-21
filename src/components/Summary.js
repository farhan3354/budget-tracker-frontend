import React from "react";

const Summary = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;
  const balanceColorClass = balance >= 0 ? "text-green-500" : "text-red-500";
  const balanceText = balance >= 0 ? "Balance" : "Balance"; // Keep "Balance" consistent

  return (
    <div className="mb-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="font-semibold text-gray-700">Income:</p>
          <p className="text-green-600">${income.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-700">Expenses:</p>
          <p className="text-red-600">${expense.toFixed(2)}</p>
        </div>
        <div className="col-span-2 text-center">
          <p className="font-semibold text-gray-700">{balanceText}:</p>
          <p className={`${balanceColorClass} font-bold text-lg`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;