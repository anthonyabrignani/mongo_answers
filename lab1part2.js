// Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({first_name: "Anthony", last_name: "Abrignani", email: "anthonyabrignani@gmail.com", gender: "Male", state: "Michigan", children: []});
// Add another person. They should have at least two children.
db.people.insertOne({first_name: "Gary", last_name: "Berry", email: "gberry@gmail.com", gender: "Male", state: "Georgia", children: ["Alice", "Isaac"]});
// Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne({first_name: "Clarence"}, {$set: {state: "South Dakota"}});
// Update Rebecca Hayes. Remove her email address.
db.people.updateOne({first_name: "Rebecca", last_name: "Hayes"}, {$unset: {email: ""}});
// Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({state: "Missouri"}, {$inc: {age: 1}});
// Jerry Baker has updated information. Replace with a new document: { first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne({first_name: "Jerry", last_name: "Baker"}, { first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", children: [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] });
// Delete Wanda Bowman.
db.people.deleteOne({first_name: "Wanda", last_name: "Bowman"});
// Delete everyone who does not have an email address specified. (expect 37 matches)
db.people.deleteMany({email: null})
// Add several documents to a new submissions collection. Do it all in one command. (Remember, MongoDB will create the collection for you. Just start adding documents.)
//      {title: "The River Bend", upvotes: 10, downvotes: 2, artist: ObjectId("60ae8b3228724339b6b82e07")},
//      {title: "Nine Lives", upvotes: 7, downvotes: 0, artist: ObjectId("60ae8b3228724339b6b82e35")},
//      {title: "Star Bright", upvotes: 19, downvotes: 3, artist: ObjectId("60ae8b3228724339b6b82eb8")},
//      {title: "Why Like This?", upvotes: 1, downvotes: 5, artist: ObjectId("60ae8b3228724339b6b82e3e")},
//      {title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: ObjectId("60ae8b3228724339b6b82e05")}
db.posts.insertMany([{title: "The River Bend", upvotes: 10, downvotes: 2, artist: ObjectId("60ae8b3228724339b6b82e07")}, {title: "Nine Lives", upvotes: 7, downvotes: 0, artist: ObjectId("60ae8b3228724339b6b82e35")}, {title: "Star Bright", upvotes: 19, downvotes: 3, artist: ObjectId("60ae8b3228724339b6b82eb8")}, {title: "Why Like This?", upvotes: 1, downvotes: 5, artist: ObjectId("60ae8b3228724339b6b82e3e")}, {title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: ObjectId("60ae8b3228724339b6b82e05")}]);
// Add 2 upvotes for "The River Bend".
db.posts.updateOne({title: "The River Bend"}, {$inc: {upvotes: 2}});
// Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.posts.updateMany({upvotes: {$gte: 10}}, {$set: {round2: true}});
// OPTIONAL ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Update Helen Clark. She had a baby! Add a child, name: Melanie, age: 0.

// Joan Bishop has a child named Catherine. She just had a birthday and prefers to go by "Cat". In one query update the child's name to "Cat" and increment her age by one.

// List all submissions that have more downvotes than upvotes.
