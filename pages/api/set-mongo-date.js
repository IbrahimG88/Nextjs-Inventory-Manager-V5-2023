// pages/api/date.js
import { connectToDatabase } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db("myFirstDatabase");
    const collection = db.collection("appVariables");

    const nowDate = await collection.updateOne(
      { date2: { $exists: true } },
      { $currentDate: { date2: { $type: "timestamp" } } }
    );
    if (!nowDate) {
      return res.status(404).json({ message: "Tests list not found" });
    }

    return res.status(200).json(nowDate);
  } catch (error) {
    console.error(error);
    const { status = 500, message = "Something went wrong" } = error;
    return res.status(status).json({ message });
  }
}
