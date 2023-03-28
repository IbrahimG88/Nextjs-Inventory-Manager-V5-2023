import { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";

export default function StocksForm(props) {
  // Define state variables for input values
  const [instrument, setInstrument] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const { item } = props;
  const [isUpdating, setIsUpdating] = useState(false);

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
    const newTotalStocks =
      item?.stocksArray?.reduce(
        (acc, stock) => acc + parseInt(stock.amount),
        0
      ) || 0;

    setUpdatedItem({
      id: item?.id || "",
      testName: item?.testName || "",
      stocksArray: item?.stocksArray || [],
      totalStocks: newTotalStocks,
    });
  }, [item]);

  const handleDelete = (index) => {
    console.log("index", index);
    const newStocksArray = updatedItem.stocksArray.filter(
      // filter out the stock to be deleted
      (stock, i) => i !== index
    );
    const newTotalStocks = newStocksArray.reduce((acc, stock) => {
      return acc + parseInt(stock.amount);
    }, 0);

    const newUpdatedItem = {
      ...updatedItem,
      stocksArray: newStocksArray,
      totalStocks: newTotalStocks,
    };

    setUpdatedItem(newUpdatedItem);
    console.log("item after stocks deletion", newUpdatedItem);
    saveItem(newUpdatedItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser behavior
    // Do something with the input values
    console.log({ instrument, amount, expiryDate });
    const stockEntry = {
      instrument,
      amount,
      expiryDate,
    };

    try {
      const newStocksArray = [...updatedItem.stocksArray, stockEntry];
      const newTotalStocks = newStocksArray.reduce((acc, stock) => {
        return acc + parseInt(stock.amount);
      }, 0);

      const newUpdatedItem = {
        ...updatedItem,
        stocksArray: newStocksArray,
        totalStocks: newTotalStocks,
      };

      setUpdatedItem(newUpdatedItem);
      console.log("item after stocks addition", newUpdatedItem);
      await saveItem(newUpdatedItem);
      setInstrument("");
      setAmount("");
      setExpiryDate("");
    } catch (error) {
      console.error(error);
    }
  };

  let counter = 1; // initialize counter

  // send the updated item to the parent component so when it is recalled the stockForm component it uses the updated item

  async function saveItem(updatedItem) {
    // save the updatedItem using the api update-stocks endpoint
    console.log("updatedItem from saveItem function", updatedItem);
    if (updatedItem.stocksArray.length > 0) {
      try {
        setIsUpdating(true); // Set isUpdating to true before calling setUpdatedItem
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
      } finally {
        setIsUpdating(false); // Set isUpdating to false after setUpdatedItem is completed
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
          disabled={isUpdating} // Disable the submit button if isUpdating is true
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isUpdating ? "disabled:opacity-50" : ""
          }`}
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
            (stock, index) => (
              (stock.id = counter),
              counter++, // increment counter by one
              (
                <tr key={stock.id}>
                  <td className="border px-4 py-2">{stock.id}</td>
                  <td className="border px-4 py-2">{stock.amount}</td>
                  <td className="border px-4 py-2">{stock.instrument}</td>
                  <td className="border px-4 py-2">{stock.expiryDate}</td>
                  <td>
                    {" "}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
                      onClick={() => handleDelete(index)}
                    >
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 1.6a8.4 8.4 0 100 16.8 8.4 8.4 0 000-16.8zM13.4 14l-1.4 1.4L10 11.4l-2-2L6.6 10l2 2-2.6 2.6L5 13.4l2.6-2.6 2-2L9.4 7l2 2L14 6.6l1.4 1.4L11.4 10l2 2z" />
                      </svg>
                    </button>
                  </td>
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

// next issue to work on: when you search for an item the indexes get messed up we need to use the item id instead  of the index

// the issue is that setUpdatedItem is not updating by each submit
