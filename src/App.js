import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import CategoryChart from "./components/CategoryChart";

const API_URL = "https://nodejs-server-n42masq3m-farhans-projects-541bb7ad.vercel.app/api/transactions"; // Adjust if your backend runs on a different port

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      // Ensure that the id is correctly set.
      const data = response.data.map(item => ({
        ...item,
        id: item._id, // Use _id from MongoDB, and create a new 'id' field.
      }));
      setTransactions(data);
    } catch (err) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category || !formData.type) {
      alert("Please fill in all fields.");
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        ...formData,
        amount: parseFloat(formData.amount),
      });

        // Ensure the id is set for the new transaction.
        const newTransaction = {
            ...response.data,
            id: response.data._id
        }
      setTransactions([...transactions, newTransaction]);
      setFormData({ title: "", amount: "", category: "", type: "expense" });
    } catch (err) {
      setError(err.message || "Failed to add transaction");
      alert("Failed to add transaction.");
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      console.log("handleDelete called with ID:", id); // Debugging
      await axios.delete(`${API_URL}/${id}`);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete transaction");
      alert("Failed to delete transaction.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Simple loading indicator
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>; // Simple error message
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Budget Tracker</h1>
      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Summary transactions={transactions} />
      <TransactionList transactions={transactions} handleDelete={handleDelete} />
      <CategoryChart transactions={transactions} />
    </div>
  );
}

export default App;
