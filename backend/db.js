const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://yadubir12:6SYMJQ11ZoMDYUsU@cluster0.2awhtlt.mongodb.net/'
const connectToMongo = async () => {
    try {
      mongoose.connect(mongoURI);
      console.log("Connected to Mongo !");
    } catch (error) {
      console.log(error);
    }
  };

module.exports = connectToMongo ;