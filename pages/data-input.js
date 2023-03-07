import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { fetcher } from "@/lib/fetcher";

export default function DataInputs() {
  const [originalTestsList, setOriginalTestsList] = useState([]);
  const [testsList, setTestsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [savedData, setSavedData] = useState([]);
  const [openedAccordionItem, setOpenedAccordionItem] = useState(null);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    const fetchTestsList = async () => {
      const data = await fetcher("/api/get-testslist");
      if (data) {
        setOriginalTestsList(data);
        setTestsList(data);
      } else {
        console.error("Error fetching tests list from database");
      }
    };

    if (originalTestsList.length === 0) {
      fetchTestsList();
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setTestsList(
      originalTestsList.filter((test) =>
        test.testName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSaveData = () => {
    setSavedData([...savedData, { ...testData }]);
    setOpenedAccordionItem(null);
  };

  const handleAccordion = (e, id) => {
    e.preventDefault();
    setOpenedAccordionItem(id);
  };

  const handleAmountChange = (e, testId, index) => {
    const { name, value } = e.target;
    const updatedData = { ...testData };
    updatedData[testId][index][name] = value;
    setTestData(updatedData);
  };

  const handleAddLine = (testId) => {
    const newData = [...testData[testId], { amount: "", expiryDate: "" }];
    setTestData({ ...testData, [testId]: newData });
  };

  const renderTestTable = (test) => {
    if (!testData[test.id]) {
      setTestData({ ...testData, [test.id]: [{ amount: "", expiryDate: "" }] });
    }

    return (
      <div key={test.id}>
        <h2>
          <button onClick={(e) => handleAccordion(e, test.id)}>
            {test.testName}
          </button>
        </h2>
        {openedAccordionItem === test.id && (
          <div>
            {testData[test.id].map((line, index) => (
              <div key={index}>
                <label>
                  Amount:
                  <input
                    type="text"
                    name="amount"
                    value={line.amount}
                    onChange={(e) => handleAmountChange(e, test.id, index)}
                  />
                </label>
                <label>
                  Expiry Date:
                  <input
                    type="date"
                    name="expiryDate"
                    value={line.expiryDate}
                    onChange={(e) => handleAmountChange(e, test.id, index)}
                  />
                </label>
              </div>
            ))}
            <button onClick={() => handleAddLine(test.id)}>Add Line</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Data Inputs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Data Inputs</h1>

      <input type="text" placeholder="Search" onChange={handleSearch} />

      {testsList.map((test) => renderTestTable(test))}

      <button onClick={handleSaveData}>Save Data</button>

      <div>
        {savedData.map((data, index) => (
          <div key={index}>
            <h2>Test {index + 1}</h2>
            {Object.keys(data).map((id) => (
              <div key={id}>
                <h3>{testsList.find((test) => test.id === id).testName}</h3>
                {data[id].map((line, index) => (
                  <div key={index}>
                    <p>Amount: {line.amount}</p>
                    <p>Expiry Date: {line.expiryDate}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
