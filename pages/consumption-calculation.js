// Define a function to subtract A from B
// Array A is consumption array from LIS with frequencies
// Array B is the testsList array from MongoDB with stocks and stocksArrays

// remove later, thats only for testing

///
// will change it from a helper to a react function:
//export const subtractArrays = (A, B) => {
export default function subtractArrays() {
  const A = [
    { name: "Hemogram", frequency: 1 },
    { name: "Complete Blood Count", frequency: 6 },
    { name: "Glycated Hemoglobin (HbA1C)", frequency: 2 },
    { name: "Random Blood Glucose", frequency: 1 },

    { name: "Kidney Function", frequency: 1009 },
  ];

  const B = {
    _id: "64006f25a441636e45b2004e",
    testsList: [
      {
        id: 1,
        testName: "Kidney Function",
        stocksArray: [
          {
            instrument: "vidas",
            amount: "1010",
            expiryDate: "2023-03-22",
            id: 1,
          },
          {
            instrument: "vidas",
            amount: "20222",
            expiryDate: "2023-03-22",
            id: 2,
          },
          {
            instrument: "vidas",
            amount: "44",
            expiryDate: "2023-03-23",
            id: 3,
          },
          { instrument: "", amount: "123123123", expiryDate: "", id: 4 },
          {
            instrument: "vidas",
            amount: "20303",
            expiryDate: "2023-04-12",
            id: 5,
          },
        ],
      },
    ],
  };
  console.log("A", A);
  console.log("B", B);
  // Loop through each object in A
  A.forEach((objA) => {
    console.log("objA", objA);
    // Find the matching object in B based on the name or testName property
    let objB = B.testsList.find((b) => b.testName === objA.name);
    console.log("objB", objB);
    // If there is a match, update the totalStocks and amount properties of objB
    if (objB) {
      // Subtract the frequency of objA from the totalStocks of objB
      objB.totalStocks -= objA.frequency;

      // Sort the stocksArray of objB by expiryDate in ascending order
      objB.stocksArray.sort(
        (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
      );

      // Initialize a variable to store the remaining frequency to subtract
      let remaining = objA.frequency;

      // Loop through each object in the stocksArray of objB
      for (let stock of objB.stocksArray) {
        // If the remaining frequency is less than or equal to the amount of stock, subtract it from the stock and break the loop
        if (remaining <= stock.amount) {
          stock.amount -= remaining;
          break;
        }

        // Otherwise, subtract the amount of stock from the remaining frequency and set the stock amount to zero
        else {
          remaining -= stock.amount;
          stock.amount = 0;
        }

        // Filter out any stocks that have zero amount
        objB.stocksArray = objB.stocksArray.filter((stock) => stock.amount > 0);
      }

      // If there is no match, do nothing
    }
  });
  console.log("B as a result", B);
  return (
    <div>
      {B.testsList.map((test) => (
        <div key={test.id}>
          <h3>{test.testName}</h3>
          <p>Total stocks: {test.totalStocks}</p>
          <ul>
            {test.stocksArray.map((stock) => (
              <li key={stock.id}>
                Instrument: {stock.instrument}
                Amount: {stock.amount}
                Expiry date: {stock.expiryDate}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Return the updated array B
