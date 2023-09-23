const Product = require('../models/Product.model');
const getKeywords = require('../function/keyword-extraction/filter')

exports.keyword_extraction = async  (req, res) => {
    try {
        //http://localhost:8080/keywords/filter/?categoryid=27594&brand=&keyword=&value=price&valuemin=-1&valuemax=999999999
        const productsFiltered = await Product.find({
            primary_category_id: req.query.categoryid,
            }).where(req.query.value).gt(req.query.valuemin).lt(req.query.valuemax);
        console.log(productsFiltered.length)
        if (productsFiltered.length !== 0) {
            const productSortBySold = productsFiltered.sort((b, a) => {
                return a?.all_time_quantity_sold - b?.all_time_quantity_sold;
            })
            let quantityExtraction = 0;
            if (productSortBySold.length >=50) {
                quantityExtraction = 50
            } else {
                quantityExtraction = productSortBySold.length
            }
            const names = [];
            for (var i=0; i<quantityExtraction; i++) {
                names.push(productSortBySold[i].name)
            }

            console.log(names)
            const keywords = await getKeywords(names);
            
            console.log(keywords)
            res.send({
                keywords: keywords,
                query: req.query
            })
        } else {
            res.status(404).json
        }
    } catch (error) {
        console.log(error)
    }
};