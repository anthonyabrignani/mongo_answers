// List all people. (200)
db.people.find();
// Count all people. (200)
db.people.find().count();
// List all people in Arizona. (6)
db.people.find({state: "Arizona"});
// List all males in Arizona. (2)
db.people.find({$and: [{state: "Arizona"}, {gender: "Male"}]});
// List all people in Arizona plus New Mexico. (8)
db.people.find({$or: [{state: "Arizona"}, {state: "New Mexico"}]});
// List all people under age 40. (90)
db.people.find({age: {$lt: 40}});
// List all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find({ $and: [{ age: { $gte: 40, $lte: 45 }, gender: "Female", state: "Florida" }]});
// List people whose first name starts with "H". (2)
db.people.find({ first_name: /^H/ });
// List all people in Michigan, sorted by first name. (6)
db.people.find({state: "Michigan"}).sort({ first_name: 1 });
// List all people who live in Virginia or are named Virginia. (9)
db.people.find({$or: [{state: "Virginia"}, {first_name: "Virginia"}]});
// List the names of people under age 30. Only display their first and last name. (38)
db.people.find({age: {$lt: 30}}, {_id: false, email: false, gender: false, age: false, state: false, children: false});
// List all people in Montana. Display all information except age. (2)
db.people.find({state: "Montana"}, {age: false});
// List the email addresses of people with a ".edu" email. Only display the email. (12)
db.people.find({email: /.edu$/}, {_id: false, first_name: false, last_name: false, gender: false, age: false, state: false, children: false});
// OPTIONAL ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Count all people with at least one child under age four. (69)

// List people who have no children. (43)

// List people who have at least one child. (157)

