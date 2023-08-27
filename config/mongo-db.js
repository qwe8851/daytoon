const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((error) => console.log(`mongoDB failed: ${error}`));