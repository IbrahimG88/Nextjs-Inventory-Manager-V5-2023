import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { fetcher } from "../lib/fetcher";

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //todo here
  useEffect(() => {
    const fetchTestsList = async () => {
      const data = await fetcher("/api/get-testslist");

      setData(data);
      setLoading(false);
    };
    fetchTestsList();
    console.log("data", data);
  }, [data]);

  const columns = [
    {
      title: "Test Name",
      dataIndex: "testName",
      key: "testName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => {
        const subRows = record.subRows || [];
        return subRows.reduce(
          (acc, subRow) => acc + parseInt(subRow.amount),
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
            <span>Amount: {subRow.amount}</span>
            <span>Expiry Date: {subRow.expiryDate}</span>
          </div>
        ));
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
        <Table columns={columns} dataSource={data} />
      )}
    </>
  );
}
