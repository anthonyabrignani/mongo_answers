// PEOPLE ---------------------------------------------------------------------------------------------------------------------------------------------
// Average age Expected Result: 41.41
db.people.aggregate([{ $group: { _id: null, averageAge: { $avg: "$age" } } }]);
// Average age by gender Expected Result: Female: 42.04, Male: 40.60
db.people.aggregate([
  { $group: { _id: "$gender", averageAge: { $avg: "$age" } } },
]);
// Number of people by gender Expected Result: Female: 113, Male: 87
db.people.aggregate([{ $group: { _id: "$gender", total: { $sum: 1 } } }]);
// 3 oldest people Expected Result: Phyllis Gray 81, Melissa Banks 79, Walter Bishop 76
db.people.aggregate([
  { $sort: { age: -1 } },
  { $limit: 3 },
  { $group: { _id: "$age" } },
]);
// 5 youngest people, display only their names as one value (first + " " + last) and their ages
// Expected Result: Nicholas Hunter 17, Kenneth Burns 18, Kathy Hayes 19, Edward Hayes 21, Steve Vasquez 21)
db.people.aggregate([
  { $sort: { age: 1 } },
  { $limit: 5 },
  {
    $project: {
      _id: false,
      name: { $concat: ["$first_name", " ", "$last_name"] },
      age: "$age",
    },
  },
]);
// Average number of children Expected Result: 2.34
db.people.aggregate([
  { $group: { _id: null, numberOfChildren: { $sum: { $size: "$children" } } } },
  {
    $project: {
      _id: false,
      averageChildren: [{ $divide: ["$numberOfChildren", 200] }],
    },
  },
]);
// Name and age of children in Michigan who are under age ten Expected Result: Adam 0, Janice 1, Judith 3, Beverly 4, Antonio 6, Jeremy 7
db.people.aggregate([
  { $match: { state: "Michigan" } },
  { $unwind: "$children" },
  {
    $project: {
      name: true,
      age: true,
    },
  },
]);
// Average age of child by state, sorted with oldest first Expected Result: Rhode Island 20, Idaho 20, Louisiana 15.7, Kentucky 13.1, Indiana 12.6, ...

// ORDERS --------------------------------------------------------------------------------------------------------------------------------------------
// Find the total dollar amount of all sales ever. Use the total field. Expected Result: 680.92
db.orders.aggregate([
  { $group: { _id: null, totalSales: { $sum: "$total" } } },
]);
// Find the total dollar amount of sales on 2017-05-22. Use the total field. Expected Result: 271.2
db.orders.aggregate([
  { $match: { date: "2017-05-22" } },
  { $group: { _id: "$total", totalSales: { $sum: "$total" } } },
  {$project: {_id: false, total: {$sum: "$totalSales"}}}
]);
// Find the date with the greatest number of orders. Include the date and the number of orders. Expected Result: 2017-05-04 3

// Find the date with the greatest total sales. Include the date and the dollar amount for that day. Expected Result: 2017-05-22 $271.2

// Find the top three products that have had the greatest number sold. Include product name and number sold. Expected Result: Pine Nuts 13, Cheese 8, Top Hat 5

// Find the top item that has the greatest revenue (number sold * price). Include product name and dollar amount of sales. Expected Result: Shoes 197.98
