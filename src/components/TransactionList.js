import React from "react";

const TransactionList = ({ transactions, handleDelete }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => {
                return (
                  <tr
                    key={t.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 whitespace-nowrap">{t.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">${t.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{t.category}</td>
                    <td className="py-3 px-4 whitespace-nowrap capitalize">{t.type}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          console.log("Deleting transaction with ID:", t.id); // Debugging
                          handleDelete(t.id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;