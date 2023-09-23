const Product = require('../models/Product.model');
const getProductsStatistics = require('../function/filter/revenue-category')

// controllers/products.controller.js
exports.product_filter = async (req, res) => {
    //http://localhost:8080/products/filter/?categoryid=27594&brand=&keyword=&value=price&valuemin=0&valuemax=99000
    const productsfiltered = await Product.find({
        name:  {"$regex": `${req.query.keyword}`, "$options": "i" },
        brand_name:  {"$regex": `${req.query.brand}`, "$options": "i" },
        primary_category_id: req.query.categoryid,
        }).where(req.query.value).gt(req.query.valuemin).lt(req.query.valuemax)
        console.log(req.query)
    
     if (productsfiltered) {
        const productsStatistics = await getProductsStatistics(productsfiltered);

        
        res.send({
            overview: productsStatistics.overview,
            query: req.query,
            topProducts: productsStatistics.topProducts,
            topShops: productsStatistics.topShops,
            topBrands: productsStatistics.topBrands,
            priceRange: productsStatistics.priceRange
        });
     } else {
        res.status(404)
     }
};
