const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema({
    id: {type: String, required: true},
    phone_number: {type: Number, required: false},
    mail: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    date_signup: {type: Date, require: true}

});

// Export the model
module.exports = mongoose.model('Account', AccountSchema);