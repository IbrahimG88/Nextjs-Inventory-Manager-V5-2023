import { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";

export default function Example() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    testName: "",
    totalStocks: 0,
    stocksArray: [],
    amount: "",
    expiryDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTestsList();
  }, []);

  const fetchTestsList = async () => {
    const data = await fetcher("/api/get-testslist");
    if (data) {
      setData(data);
    } else {
      console.error("Error fetching tests list from database");
    }
  };

  const addData = async () => {
    const newStock = {
      id: Math.floor(Math.random() * 1000),
      amount: form.amount,
      expiryDate: form.expiryDate,
    };
    const newData = {
      id: Math.floor(Math.random() * 1000),
      testName: form.testName,
      totalStocks: form.totalStocks,
      stocksArray: [...form.stocksArray, newStock],
    };
    await fetch("/api/update-stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    fetchTestsList();
  };

  const updateData = async (id) => {
    const newData = {
      id: id,
      testName: form.testName,
      totalStocks: form.totalStocks,
      stocksArray: form.stocksArray,
    };
    await fetch(`/api/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    fetchTestsList();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            <h3>{item.testName}</h3>
            <p>Total Stocks: {item.totalStocks}</p>
            <ul>
              {item.stocksArray.map((stock) => (
                <li key={stock.id}>
                  <p>Amount: {stock.amount}</p>
                  <p>Expiry Date: {stock.expiryDate}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => updateData(item.id)}>Update</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addData}>
        <input
          type="text"
          placeholder="Test Name"
          value={form.testName}
          onChange={(e) => setForm({ ...form, testName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Stocks"
          value={form.totalStocks}
          onChange={(e) =>
            setForm({ ...form, totalStocks: parseInt(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="date"
          placeholder="Expiry Date"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
