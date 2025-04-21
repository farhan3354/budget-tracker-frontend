import React from "react";

const TransactionForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="mb-6 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add New Transaction
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center text-gray-700 text-sm mr-4">
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === "income"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300"
            />
            <span className="ml-2">Income</span>
          </label>
          <label className="inline-flex items-center text-gray-700 text-sm">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === "expense"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
            />
            <span className="ml-2">Expense</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;