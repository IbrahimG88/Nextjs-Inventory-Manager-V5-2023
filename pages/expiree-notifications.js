import { useState } from "react";
import Fuse from "fuse.js";
import { connectToDatabase } from "../lib/db";

export async function getServerSideProps() {
  try {
    const client = await connectToDatabase();
    const db = client.db("myFirstDatabase");

    const collectionInventory2 = db.collection("inventory2");
    const testsListFromMongo = await collectionInventory2.findOne({});
    if (!testsListFromMongo) {
      return res.status(404).json({ message: "testsList not loaded " });
    }
    console.log("testsList", testsListFromMongo.testsList);

    return {
      props: {
        data: testsListFromMongo.testsList,
      },
    };
  } catch (error) {
    // Log the error message and return an empty props object
    console.error(error.message);
    return { props: {} };
  }
}

export default function StocksComponent({ data }) {
  const [expiryFilter, setExpiryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data
    .map((item) => {
      if (!Array.isArray(item.stocksArray)) {
        return null;
      }
      const filteredStocks = item.stocksArray.filter((stock) => {
        const [year, month, day] = stock.expiryDate.split("-").map(Number);
        const expiryDate = new Date(Date.UTC(year, month - 1, day));
        const currentDate = new Date();
        const timeDiff = expiryDate.getTime() - currentDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        if (expiryFilter === 30) {
          return daysDiff <= expiryFilter;
        } else if (expiryFilter === 60) {
          return daysDiff <= expiryFilter;
        } else {
          return true;
        }
      });
      if (filteredStocks.length > 0) {
        return { ...item, stocksArray: filteredStocks };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);

  const fuse = new Fuse(filteredData, {
    keys: [
      "testName",
      "stocksArray.instrument",
      "stocksArray.amount",
      "stocksArray.expiryDate",
    ],
    threshold: 0.3,
  });

  const searchResults = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : filteredData;

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setExpiryFilter(30)}>1 Month till Expiry</button>
      <button onClick={() => setExpiryFilter(60)}>2 Months till Expiry</button>
      <ul>
        {searchResults.map((item, itemIndex) => (
          <li key={`${item.testName}-${itemIndex}`}>
            <h2>{item.testName}</h2>
            <ul>
              {item.stocksArray.map((stock, stockIndex) => (
                <li key={`${stock.instrument}-${stockIndex}`}>
                  {stock.instrument} - {stock.amount} - {stock.expiryDate}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
