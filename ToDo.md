now save the changes in mongodb
add a spinner when loading
work on the menu drawer
add the order code
then add next-auth code

---

receive the data from lis for consumpion get the date and set it after you receive the data

add the code in components folder and call it from index.js

progress:

now i get the date from database,
next extract all day, and time from database date, and do the same to extract all values from now date, then use these data to get from lis the lab consumption

---

update the date in mongo with the now date properties

create the fetch request using previous and now date and use your created get request from previous app, if there is a result and length is not 0 update the date in mongo

---

i Have this array A: [{"name":"Total IgE","frequency":1},{"name":"Complete Blood Count","frequency":16},{"name":"TSH","frequency":8},{"name":"T3 (Free)","frequency":5},{"name":"T4 (Free)","frequency":6},{"name":"Serum Uric Acid","frequency":5},{"name":"Cervical Swab Culture","frequency":1},{"name":"S.G.P.T (ALT)","frequency":5},{"name":"S.G.O.T (AST)","frequency":4},{"name":"Serum B-HCG","frequency":3},{"name":"ABO Group","frequency":1},{"name":"Rh Blood Group","frequency":1},{"name":"Glycated Hemoglobin (HbA1C)","frequency":5},{"name":"Urine Analysis","frequency":8},{"name":"Progesterone","frequency":2},{"name":"Sample from home","frequency":3}];; and I have a singel object of this array B which is an array of objects:
{id: 7,stocksArray: {amount: "200",expiryDate: "2023-03-24":id:1,instrument: "vidas", amount: "200",expiryDate: "2023-03-24"}]

---

i Have this array A: [{"name":"Total IgE","frequency":1},{"name":"Complete Blood Count","frequency":16},{"name":"TSH","frequency":8},{"name":"T3 (Free)","frequency":5},{"name":"T4 (Free)","frequency":6},{"name":"Serum Uric Acid","frequency":5},{"name":"Cervical Swab Culture","frequency":1},{"name":"S.G.P.T (ALT)","frequency":5},{"name":"S.G.O.T (AST)","frequency":4},{"name":"Serum B-HCG","frequency":3},{"name":"ABO Group","frequency":1},{"name":"Rh Blood Group","frequency":1},{"name":"Glycated Hemoglobin (HbA1C)","frequency":5},{"name":"Urine Analysis","frequency":8},{"name":"Progesterone","frequency":2},{"name":"Sample from home","frequency":3}];; and I have a singel object of this array B which is an array of objects:
[{id: 7,testName:"Creatinine Clearance",totalStocks:400,stocksArray: {amount: "200",expiryDate: "2023-03-24":id:1,instrument: "vidas", amount: "200",expiryDate: "2023-03-24"}];;;;;;; I want to check the frequency of array A of a name eg Creatinine Clearance and the matching testName from Array B with testName also Creatinine clearance. The frequency for example from Array A if it was say 200, I want to do for the matching item from array B: to deduct 200 from the object property totalStocks, and I want to deduct 200 from all the stocksArray list items from property amounts a total of 200 also. Subtract the 200 from the stocksArray with the nearest expiry date. If during the subtraction the amount of this stocksArray object or list item it reached zero start subtracting the rest of the 200 from the next item with nearest expiryDate and so on

---

now fix the code in subtract-consumption file and test it line by line and get from console the arrays A and B examples and run them in the file and copy it in a pages file to run and test
