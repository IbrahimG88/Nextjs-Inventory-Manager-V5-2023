import { useState, setState, useEffect } from "react";

export default function StocksForm(props) {
  // Define state variables for input values
  const [instrument, setInstrument] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const { item } = props;

  console.log("StocksForm props item", item);

  // Add a default value for updatedItem state in case item prop is missing or invalid
  const [updatedItem, setUpdatedItem] = useState({
    id: item?.id || "",
    testName: item?.testName || "",
    stocksArray: item?.stocksArray || [],
    totalStocks: item?.totalStocks || 0,
  });

  // Use useEffect to synchronize updatedItem state with item prop
  useEffect(() => {
    setUpdatedItem({
      id: item?.id || "",
      testName: item?.testName || "",
      stocksArray: item?.stocksArray || [],
      totalStocks:
        item?.totalStocks ||
        item?.stocksArray.reduce(
          (acc, stock) => acc + parseInt(stock.amount),
          0
        ),
    });
  }, [item]);

  // Use another useEffect hook to do something with updatedItem value after it changes
  useEffect(() => {
    console.log("item after stocks addition", updatedItem);
    // You can also call other functions or pass the updatedItem value to other components here

    // Call the async function
    saveItem(updatedItem);
  }, [updatedItem]);

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser behavior
    // Do something with the input values
    console.log({ instrument, amount, expiryDate });
    const stockEntry = {
      instrument,
      amount,
      expiryDate,
    };

    setUpdatedItem((prevItem) => {
      const sum = prevItem.stocksArray.reduce((acc, stock) => {
        return acc + parseInt(stock.amount);
      }, 0);
      return {
        ...prevItem,
        stocksArray: [...prevItem.stocksArray, stockEntry],
        totalStocks: sum + parseInt(stockEntry.amount),
      };
    });

    console.log("item after stocks addition", updatedItem);
  };

  let counter = 1; // initialize counter

  async function saveItem(updatedItem) {
    // save the updatedItem using the api update-stocks endpoint
    if (updatedItem.stocksArray.length > 0) {
      try {
        const response = await fetch("/api/update-stocks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
          throw new Error("Failed to save item");
        }

        console.log("Item saved successfully");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <title className="text-4xl block text-gray-700 text-sm font-bold mb-2">
          Item name: {item.testName}
        </title>
        <br />
        <div className="mb-4">
          <label
            htmlFor="instrument"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instrument
          </label>
          <input
            type="text"
            id="instrument"
            name="instrument"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="form-input w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="expiryDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="form-input w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <div className=" flex justify-between">
          <label
            htmlFor="expiryDate"
            className="text-4xl block text-gray-700 text-sm font-bold mb-2"
          >
            Total Stocks:
          </label>
          <h1 className="text-4xl block text-gray-700 text-sm font-bold mb-2">
            {" "}
            {updatedItem.totalStocks}
          </h1>
        </div>
      </form>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Entry</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Instrument</th>
            <th className="px-4 py-2">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {updatedItem.stocksArray.map(
            (stock) => (
              (stock.id = counter),
              counter++, // increment counter by one
              (
                <tr key={stock.id}>
                  <td className="border px-4 py-2">{stock.id}</td>
                  <td className="border px-4 py-2">{stock.amount}</td>
                  <td className="border px-4 py-2">{stock.instrument}</td>
                  <td className="border px-4 py-2">{stock.expiryDate}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      ;
    </>
  );
}
