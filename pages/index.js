import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { connectToDatabase } from "../lib/db";
import { getPreviousDate } from "../lib/helpers/get-set-dates";
import { getNowDate } from "../lib/helpers/get-set-dates";

const inter = Inter({ subsets: ["latin"] });

// Use serverSideProps to fetch data on each request
export async function getServerSideProps() {
  // Connect to MongoDB Atlas

  // Use try/catch blocks to handle errors
  try {
    const client = await connectToDatabase();
    const db = client.db("myFirstDatabase");
    const collectionAppVariables = db.collection("appVariables");

    // for more processing add another const collectionInventory2 = db.collection("inventory2");

    // Find one document in appVariables collection where date2 exists
    const appVariable = await collectionAppVariables.findOne({
      date2: { $exists: true },
    });
    if (!appVariable) {
      return res.status(404).json({ message: "date2 not found" });
    }

    // Use JSON.stringify() to convert date2 into a string
    const dateValue = JSON.stringify(appVariable.date2);

    // set Mongo Date to now add a conditional later to only update the date if the data in mongo was updated  also here in getServerSideProps
    const nowDate = await collectionAppVariables.updateOne(
      { date2: { $exists: true } },
      { $currentDate: { date2: true } }
    );
    if (!nowDate) {
      return res
        .status(404)
        .json({ message: "now Date on Mongo was not updated " });
    }

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

export default function Home(props) {
  const dateValue = props.dateValue;
  console.log("getPreviousDate()", getPreviousDate(dateValue));
  const previousDateDetails = getPreviousDate(dateValue);
  console.log("getNowDate()", getNowDate());
  const nowDateDetails = getNowDate();
  console.log("now hours", nowDateDetails.hours);

  return (
    <>
      <h1>Value for get Date: {dateValue}</h1>
    </>
  );
}
