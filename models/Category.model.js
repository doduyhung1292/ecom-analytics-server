const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    id: {type: Number, required: true},
    category_name: {type: String, required: true},
    date_renew: {type: Date, required: true},
    quantity_product: {type: Number, required: true},
});

// Export the model
module.exports = mongoose.model('Category', CategorySchema);