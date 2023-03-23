// this is only a component for illustration purposes

import { connectToDatabase } from "../lib/db";

// Use serverSideProps to fetch data on each request
export async function getServerSideProps() {
  // Connect to MongoDB Atlas

  // Use try/catch blocks to handle errors
  try {
    const client = await connectToDatabase();
    const db = client.db("myFirstDatabase");
    const collection = db.collection("appVariables");

    // Find one document in appVariables collection where date2 exists
    const appVariable = await collection.findOne({ date2: { $exists: true } });
    if (!appVariable) {
      return res.status(404).json({ message: "date2 not found" });
    }

    // Use JSON.stringify() to convert date2 into a string
    const dateValue = JSON.stringify(appVariable.date2);

    // Return the value of date2 as a prop
    return {
      props: {
        dateValue,
      },
    };
  } catch (error) {
    // Log the error message and return an empty props object
    console.error(error.message);
  }
}

// Use dateValue prop in your component
export default function GetDate(props) {
  // Use optional chaining operator to access dateValue safely
  const dateValue = props.dateValue;
  console.log("dateValue", dateValue);

  // Use optional chaining operator to render dateValue safely
  return (
    <div>
      <h1>The value of date2 is:</h1>
      <p>{dateValue}</p>
    </div>
  );
}
