import { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";
import Fuse from "fuse.js";
import StocksForm from "@/components/stocks-form";

export default function StocksToAdd() {
  const [testsList, setTestsList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [index, setIndex] = useState(null);
  const [addButton, setAddButton] = useState(false);

  useEffect(() => {
    const fetchTestsList = async () => {
      const data = await fetcher("/api/get-testslist");
      if (data) {
        setTestsList(data);
      } else {
        console.error("Error fetching tests list from database");
      }
    };

    if (testsList.length === 0) {
      fetchTestsList();

      // Refresh data every 5 seconds
      const intervalId = setInterval(() => fetchTestsList(), 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  const fuse = new Fuse(testsList, {
    keys: ["testName"],
    threshold: 0.3,
  });

  const results = fuse.search(userInput);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = (index) => {
    console.log("index", index);

    setIndex(index);
  };

  const handleAddButton = () => {
    setAddButton(!addButton);
  };

  return (
    <div>
      <h2 className="text-lg font-medium">Tests List</h2>
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          placeholder="Search..."
          value={userInput}
          onChange={handleChange}
          className="flex-1 px-4 py-2 outline-none"
        />
      </div>

      <div className="mt-4">
        <ul>
          {!addButton &&
            results.map((result, index) => (
              <li
                key={result.item.id}
                onClick={() => {
                  const itemClickedIndex = testsList.findIndex(
                    (item) => item.id === result.item.id
                  );

                  handleClick(itemClickedIndex);
                }}
              >
                {result.item.testName}
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                    onClick={() => handleAddButton()}
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-4">
        <ul className="mt-2">
          {!addButton &&
            results.length === 0 &&
            testsList.map((test, index) => (
              <li
                key={test.id}
                className="bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded cursor-pointer"
                onClick={() => handleClick(index)}
              >
                {test.testName}
                {addButton ? (
                  <div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAddButton()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                      >
                        Done
                      </button>
                      <h1>I will add the form here</h1>
                      <StocksForm item={testsList[index]} />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAddButton()}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                    >
                      Add
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
        {addButton && (
          <div>
            <div className="flex justify-end">
              <button
                onClick={() => handleAddButton()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                Done
              </button>
            </div>
            <h1>And I will add the form here</h1>
            <StocksForm item={testsList[index]} />
          </div>
        )}
      </div>
    </div>
  );
}
