import cron from "node-cron";
import fetch from "node-fetch";

export function startCronJob() {
  // Schedule tasks to be run on the server.
  cron.schedule("* * * * *", async function () {
    console.log("running updateAppData every minute");

    // Call the API route to run the update app data code
    await fetch(`${process.env.APP_URL}/update-app-data-node-cron`);
  });
}
