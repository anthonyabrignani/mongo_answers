db.menu.aggregate([{ $sort: { name: 1 } }]);

db.menu.aggregate([{ $sort: { name: 1 } }, { $limit: 3 }]);

db.menu.aggregate([{ $sort: { name: 1 } }, { $skip: 3 }, { $limit: 3 }]);

db.menu.aggregate([
  { $sort: { name: 1 } },
  { $project: { name: true, _id: false } },
]);

db.menu.aggregate([{ $match: { price: { $gt: 3 } } }]);

db.menu.aggregate([{ $match: { type: "Espresso" } }]);

db.menu.aggregate([{ $match: { type: "Espresso" } }, { $sort: { price: -1 } }]);

db.menu.aggregate([{ $group: { _id: null, price: { $min: "$price" } } }]);

db.menu.aggregate([{ $group: { _id: null, price: { $avg: "$price" } } }]);

db.menu.aggregate([
  { $group: { _id: "$type", averagePrice: { $avg: "$price" } } },
]);

db.menu.aggregate([{ $group: { _id: "$type", topPrice: { $max: "$price" } } }]);

db.menu.aggregate([
  { $group: { _id: "$type", averagePrice: { $avg: "$price" } } },
  { $project: { type: "$_id", averagePrice: true } },
  { $sort: { averagePrice: -1 } },
]);

db.menu.aggregate([{ $sort: { price: -1 } }, { $limit: 2 }]);

// How much money did Ronda make this week?
db.sales.aggregate([
  { $match: { staff: "Ronda" } },
  { $unwind: "$sales" },
  { $group: { _id: null, totalSales: { $sum: "$sales.total" } } },
]);
// How much money did each staff member make this week?
db.sales.aggregate([
  { $unwind: "$sales" },
  { $group: { _id: "$staff", totalSales: { $sum: "$sales.total" } } },
]);
// What is the average price per drink?
db.sales.aggregate([
  { $unwind: "$sales" },
  {
    $group: {
      _id: null,
      totalItems: { $sum: "$sales.items" },
      totalTotal: { $sum: "$sales.total" },
    },
  },
  {
    $project: {
      _id: false,
      pricePerDrink: { $divide: ["$totalTotal", "$totalItems"] },
    },
  },
]);
// What is the average % tip?
db.sales.aggregate([
  { $unwind: "$sales" },
  {
    $group: {
      _id: null,
      totalTotal: { $sum: "$sales.total" },
      totalTips: { $sum: "$sales.tip" },
    },
  },
  {
    $project: {
      _id: false,
      percentTip: {
        $multiply: [{ $divide: ["$totalTips", "$totalTotal"] }, 100],
      },
    },
  },
]);

// What is the average % tip per staff member?

// What is the average order total for each day of the week?

// Which day has the most tips?
