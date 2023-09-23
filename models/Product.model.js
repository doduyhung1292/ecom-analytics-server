const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    seller_id: {type: Number, required: true},
    brand_name: {type: String, required: false},
    thumbnail_url: {type: String, required: true},
    all_time_quantity_sold: {type: Number, required: true},
    category_l1_name: {type: String, required: false},
    category_l2_name: {type: String, required: false},
    category_l3_name: {type: String, required: false},
    primary_category_name: {type: String, required: true},
    primary_category_id: {type: Number, required: true},
    is_authentic: {type: Number, required: false},
    number_of_reviews: {type: Number, required: false},
    product_rating: {type: String, required: false},
    seller_type: {type: Number, required: false},
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);