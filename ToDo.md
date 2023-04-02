VIP: next stage of the app is to create monthly average per month and yearly average per month for each test using api endpoints data to predict an amount of a given test will be sufficient for how many days

work on the menu drawer and add the real components and linking to them actually, and a nice interface from tailwind or material ui or a grid for the homepage
The homepage: create list with dividers and each elements from homepage or menu have an icon, and the header includes the app name and
navigates to the homepage write it in a nice way using tailwind or material ui
add app icon next to the name
add the order code
then add next-auth code
add splash screen for the app

add setting component option, which can: poppulate testsList and upload all testsData to mongo, you already have this functionality in your project, delete them from mongo if you want to reset all app data\

---

i Have this array A: [{"name":"Total IgE","frequency":1},{"name":"Complete Blood Count","frequency":16},{"name":"TSH","frequency":8},{"name":"T3 (Free)","frequency":5},{"name":"T4 (Free)","frequency":6},{"name":"Serum Uric Acid","frequency":5},{"name":"Cervical Swab Culture","frequency":1},{"name":"S.G.P.T (ALT)","frequency":5},{"name":"S.G.O.T (AST)","frequency":4},{"name":"Serum B-HCG","frequency":3},{"name":"ABO Group","frequency":1},{"name":"Rh Blood Group","frequency":1},{"name":"Glycated Hemoglobin (HbA1C)","frequency":5},{"name":"Urine Analysis","frequency":8},{"name":"Progesterone","frequency":2},{"name":"Sample from home","frequency":3}];; and I have a singel object of this array B which is an array of objects:
{id: 7,stocksArray: {amount: "200",expiryDate: "2023-03-24":id:1,instrument: "vidas", amount: "200",expiryDate: "2023-03-24"}]

---

i Have this array A: [{"name":"Total IgE","frequency":1},{"name":"Complete Blood Count","frequency":16},{"name":"TSH","frequency":8},{"name":"T3 (Free)","frequency":5},{"name":"T4 (Free)","frequency":6},{"name":"Serum Uric Acid","frequency":5},{"name":"Cervical Swab Culture","frequency":1},{"name":"S.G.P.T (ALT)","frequency":5},{"name":"S.G.O.T (AST)","frequency":4},{"name":"Serum B-HCG","frequency":3},{"name":"ABO Group","frequency":1},{"name":"Rh Blood Group","frequency":1},{"name":"Glycated Hemoglobin (HbA1C)","frequency":5},{"name":"Urine Analysis","frequency":8},{"name":"Progesterone","frequency":2},{"name":"Sample from home","frequency":3}];; and I have a singel object of this array B which is an array of objects:
[{id: 7,testName:"Creatinine Clearance",totalStocks:400,stocksArray: {amount: "200",expiryDate: "2023-03-24":id:1,instrument: "vidas", amount: "200",expiryDate: "2023-03-24"}];;;;;;; I want to check the frequency of array A of a name eg Creatinine Clearance and the matching testName from Array B with testName also Creatinine clearance. The frequency for example from Array A if it was say 200, I want to do for the matching item from array B: to deduct 200 from the object property totalStocks, and I want to deduct 200 from all the stocksArray list items from property amounts a total of 200 also. Subtract the 200 from the stocksArray with the nearest expiry date. If during the subtraction the amount of this stocksArray object or list item it reached zero start subtracting the rest of the 200 from the next item with nearest expiryDate and so on

---

create a component using material ui to use in my Home compoent that displays a grid of single vertical colimn, each block of the grid navigates to each of the following components: Inventory, Expiree notification, Add Stocks,create order , Settings. I want each grid item to have a suitable icon that matches its name, make the grid and the whole component background colorful using material-ui colors
