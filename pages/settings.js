import { Inventory, NavigateNext } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";
import { Button } from "@mui/material";

export default function Settings() {
  const [inventory, setInventory] = useState([]);
  const [testsList, setTestsList] = useState([]);

  //fetch data from database
  useEffect(() => {
    fetch(`/api/get-testslist`)
      .then((response) => response.json())
      .then((data) => {
        const transformedInventory = [];

        for (const key in data) {
          transformedInventory.push({
            id: data[key].id,
            testName: data[key].testName,
            TotalStocks: data[key].totalStocks,
          });
        }

        transformedInventory.sort((a, b) => {
          if (a.TotalStocks == null || a.TotalStocks < 1) {
            return 1;
          }
          if (b.TotalStocks == null || b.TotalStocks < 1) {
            return -1;
          }
          return a.TotalStocks - b.TotalStocks;
        });

        setInventory(transformedInventory);
      });
  }, []);

  //fetch data from LIS

  const handlePopulate = async () => {
    const data = await fetcher("http://197.45.107.206/api2/integration/tests");

    const transformedTestsList = Object.entries(data).map(([key, value]) => ({
      id: value.profile_id,
      testName: value.report_name,
    }));

    if (transformedTestsList.length !== Inventory.length) {
      const response = await fetch("/api/settings-update-testsList", {
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
    }
  };

  return (
    <>
      {testsList.length > 0 ? (
        <h1 className="p-4">
          Number of tests in Inventory: {testsList.length}
        </h1>
      ) : null}
      <div className="flex justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handlePopulate}
        >
          Update or Upload TestsList
        </Button>
      </div>
    </>
  );
}
