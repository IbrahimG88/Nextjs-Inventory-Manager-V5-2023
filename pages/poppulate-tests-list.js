import { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";

export default function PopulateTestsList() {
  const [testsList, setTestsList] = useState([]);

  const handlePopulate = async () => {
    const data = await fetcher("http://197.45.107.206/api2/integration/tests");

    const transformedTestsList = Object.entries(data).map(([key, value]) => ({
      id: value.profile_id,
      testName: value.report_name,
    }));

    const response = await fetch("/api/post-testslist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testsList: transformedTestsList }),
    });

    if (response.status === 201) {
      setTestsList(transformedTestsList);
    } else {
      const message = await response.json();
      alert(message.message);
    }
  };

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

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePopulate}
      >
        Populate Tests List
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Tests List</h2>
        <ul className="mt-2">
          {testsList.map((test) => (
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
