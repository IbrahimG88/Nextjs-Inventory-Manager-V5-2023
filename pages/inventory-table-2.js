import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { fetcher } from "../lib/fetcher";

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchTestsList = async () => {
      const data = await fetcher("/api/get-testslist");

      setData(data);
      setLoading(false);
    };
    fetchTestsList();
    console.log("data", data);
  }, []);

  const handleAddSubRow = (record) => {
    event.preventDefault();
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);
    const subRows = newData[index].subRows || []; // use an empty array if subRows is undefined
    newData[index] = {
      ...record,
      subRows: [
        ...subRows,
        {
          amount: 0,
          expiryDate: "",
        },
      ],
    };
    setData(newData);
  };

  const handleDeleteSubRow = (record, index) => {
    const newData = [...data];
    const recordIndex = newData.findIndex((item) => record.key === item.key);
    newData[recordIndex].subRows = newData[recordIndex].subRows.filter(
      (_, i) => i !== index
    );
    setData(newData);
  };

  const handleRowClick = (record, index) => {
    setSelectedRow(record);
  };

  const handleSubRowChange = (record, index, fieldName, value) => {
    event.preventDefault();
    const newData = [...data];
    const recordIndex = newData.findIndex((item) => record.key === item.key);
    const subRows = newData[recordIndex].subRows || []; // use an empty array if subRows is undefined

    const newSubRows = [...subRows];
    newSubRows[index] = {
      ...newSubRows[index],
      [fieldName]: value,
    };
    newData[recordIndex] = {
      ...record,
      subRows: newSubRows,
    };
    setData(newData);
  };

  const columns = [
    {
      title: "Test Name",
      dataIndex: "testName",
      key: "testName",
      fixed: "left", // Fix the first column to prevent it from being pushed out of view when scrolling horizontally
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      fixed: "left", // Fix the second column to prevent it from being pushed out of view when scrolling horizontally
      render: (text, record) => {
        const subRows = record.subRows || [];
        return subRows.reduce(
          (acc, subRow) => acc + parseInt(subRow.amount || 0),
          0
        );
      },
    },
    {
      title: "Entries",
      dataIndex: "entries",
      key: "entries",
      render: (text, record) => {
        const subRows = record.subRows || [];
        return subRows.map((subRow, index) => (
          <div key={index}>
            <span>Amount:</span>
            <input
              type="number"
              value={subRow.amount}
              onChange={(e) =>
                handleSubRowChange(record, index, "amount", e.target.value)
              }
            />
            <span>Expiry Date:</span>
            <input
              type="date"
              value={subRow.expiryDate}
              onChange={(e) =>
                handleSubRowChange(record, index, "expiryDate", e.target.value)
              }
            />
            {index > 0 && (
              <Button onClick={() => handleDeleteSubRow(record, index)}>
                Delete
              </Button>
            )}
          </div>
        ));
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <Button onClick={() => handleAddSubRow(record)}>Add Entry</Button>
        );
      },
    },
  ];

  const handleSave = () => {
    const dataToSave = rowData.map((row) => {
      const subRows = row.subRows || [];

      return {
        ...row.original,
        amount: subRows.reduce(
          (acc, subRow) => acc + parseInt(subRow.amount),
          0
        ),
        entries: subRows.map((subRow) => ({
          amount: parseInt(subRow.amount),
          expiryDate: subRow.expiryDate,
        })),
      };
    });

    console.log("Data to save:", dataToSave);
    // Call API endpoint to save dataToSave
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={data}
            onRow={(record, index) => ({
              onClick: () => handleRowClick(record, index),
            })}
          />
        </>
      )}
    </>
  );
}
