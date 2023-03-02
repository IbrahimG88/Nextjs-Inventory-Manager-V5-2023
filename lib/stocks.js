// lib\stocks.js
import { connectToDatabase } from "./db";

export async function getStocks(testsList) {
  const client = await connectToDatabase();

  const db = client.db();

  const stocksCollection = db.collection("stocks");

  const stocks = await stocksCollection.find().toArray();

  const stocksWithTest = stocks.map((stock) => {
    const test = testsList.find((test) => test.id === stock.testId);

    return {
      ...stock,
      testId: test.id,
      testName: test.name,
    };
  });

  return stocksWithTest;
}
