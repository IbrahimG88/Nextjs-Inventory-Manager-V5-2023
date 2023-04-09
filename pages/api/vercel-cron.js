export async function handler(req, res) {
  // Schedule tasks to be run on the server.

  console.log("running updateAppData every minute");

  // Call the API route to run the update app data code
  await fetch(`${process.env.APP_URL}/update-app-data-node-cron`);
  res.status(200).json("Data updated successfully");
}
