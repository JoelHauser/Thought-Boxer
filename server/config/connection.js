const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thought-boxing', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (error) {
  console.log(error)
}

module.exports = mongoose.connection;