const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided DATABASE_URL environment variable
mongoose.connect(process.env.DATABASE_URL);

// Shortcut to the mongoose.connection object
const db = mongoose.connection;

// Event listener for the 'connected' event, triggered when the connection to MongoDB is established
db.on('connected', function() {
  // Prints a message of successful connection- the database name, host, and port
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
