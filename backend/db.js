const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://mvssriharsha9:mvssriharsha2004@addressbook.ockscnn.mongodb.net/AddressBook?retryWrites=true&w=majority&appName=AddressBook"
connectToMongo = async () => {
    await mongoose.connect(mongoURI).then(()=> {
        console.log("Connected to Mongo Successfully")
    }).catch(err => {
        console.log(err)
    });
  }

module.exports = connectToMongo;