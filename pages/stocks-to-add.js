import { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";
import Fuse from "fuse.js";

export default function PopulateTestsList() {
  const [testsList, setTestsList] = useState([]);
  const [userInput, setUserInput] = useState("");

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
    }
  }, [testsList]);

  const fuse = new Fuse(testsList, {
    keys: ["testName"],
    threshold: 0.3,
  });

  const results = fuse.search(userInput);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h2 className="text-lg font-medium">Tests List</h2>
      <div class="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          placeholder="Search..."
          value={userInput}
          onChange={handleChange}
          class="flex-1 px-4 py-2 outline-none"
        />
        <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div className="mt-4">
        <ul>
          {results.map((result) => (
            <li key={result.item.id}>{result.item.testName}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <ul className="mt-2">
          {results.length === 0 &&
            testsList.map((test) => (
              <li
                key={test.id}
                className="bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded cursor-pointer"
              >
                {test.testName}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
