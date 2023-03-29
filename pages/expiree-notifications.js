import moment from "moment";
import { connectToDatabase } from "../lib/db";

export async function getServerSideProps() {
  try {
    const client = await connectToDatabase();
    const db = client.db("myFirstDatabase");

    const collectionInventory2 = db.collection("inventory2");
    const testsListFromMongo = await collectionInventory2.findOne({});
    if (!testsListFromMongo) {
      return res.status(404).json({ message: "testsList not loaded " });
    }
    console.log("testsList", testsListFromMongo.testsList);

    return {
      props: {
        testsList: testsListFromMongo.testsList,
      },
    };
  } catch (error) {
    // Log the error message and return an empty props object
    console.error(error.message);
    return { props: {} };
  }
}
// Assuming the array is passed as a prop to the component
export default function NotificationsComponent(props) {
  const stocksArray = props.testsList;
}
