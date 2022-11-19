// we used mongoose to create a connection to our database.
// database name - JWT
const mongoose = require('mongoose');

const {MONGO_URI} = process.env;

// connection creation and creation of db

exports.connect = () => {
          mongoose.connect(MONGO_URI, {
                    useNewUrlParser: true, //pass the object to avoid deprication warning.
                    useUnifiedTopology: true 
          })
          .then(() => {
                    console.log("Succssfully connected on db");
          })
          .catch((err) => {
                    console.log(err);
          });
}
