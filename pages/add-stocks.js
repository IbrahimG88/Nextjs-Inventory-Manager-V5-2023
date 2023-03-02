/*get testslist from database from api/get-testslist.js
display a table using tailwindcss that displays the testslist
and has a collapse option or modal to write the stocks for each test in the table   
and a button to add muliples stocks each with different expiry date which the user inputs

use a table

add search functionality to search for the tests from testslist

beautify with tailwind css




*/

// pages\add-stocks.js
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TESTS_LIST } from "./graphql/queries";
import { ADD_STOCKS } from "./graphql/mutations";
import { getStocks } from "../lib/stocks";
import { connectToDatabase } from "../lib/db";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function AddStocks() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { data, loading: loadingTestsList } = useQuery(GET_TESTS_LIST);
  const [addStocks, { loading: loadingAddStocks }] = useMutation(ADD_STOCKS);
  const [testsList, setTestsList] = useState([]);
  const [testsListWithStocks, setTestsListWithStocks] = useState([]);

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/auth");
    }
  }, [session, loading]);

  useEffect(() => {
    if (data) {
      setTestsList(data.testsList);
    }
  }, [data]);

  const handleAddStocks = async (e) => {
    e.preventDefault();

    const client = await connectToDatabase();

    const db = client.db();

    const testsCollection = db.collection("inventory2");

    const tests = await testsCollection.find().toArray();

    const stocks = await getStocks(testsList);

    const testsWithStocks = tests.map((test) => {
      return {
        ...test,
        stocks: stocks.filter((stock) => stock.testId === test.id),
      };
    });

    await testsCollection.deleteMany({});

    await testsCollection.insertMany(testsWithStocks);

    setTestsListWithStocks(testsWithStocks);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center my-5">Add Stocks</h1>
      <form onSubmit={handleAddStocks}>
        <div className="flex flex-col">
          {testsList.map((test) => (
            <div key={test.id} className="my-4">
              <div className="flex justify-between">
                <h2 className="text-xl">{test.name}</h2>
                <button
                  onClick={() =>
                    setTestsList((prevTestsList) =>
                      prevTestsList.map((prevTest) =>
                        prevTest.id === test.id
                          ? { ...prevTest, showStocks: !prevTest.showStocks }
                          : prevTest
                      )
                    )
                  }
                  type="button"
                  className="bg-green-400 text-white px-4 py-2 rounded-lg"
                >
                  {test.showStocks ? "Hide" : "Show"} Stocks
                </button>
              </div>
              {test.showStocks && (
                <div className="flex flex-col">
                  {test.stocks.map((stock) => (
                    <div key={stock.id} className="flex justify-between">
                      <div className="flex flex-col">
                        <span>Batch No: {stock.batchNo}</span>
                        <span>Expiry Date: {stock.expiryDate}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>Quantity: {stock.quantity}</span>
                        <span>Price: {stock.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-400 text-white px-4 py-2 rounded-lg"
          >
            Add Stocks
          </button>
        </div>
      </form>
    </div>
  );
}
