const categories = require('../function/category')
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');
const crawlerProductsByCategory = require('../function/crawler/products_by_category');

exports.get_category = async  (req, res) => {
    //http://localhost:8080/keywords/filter/?categoryid=27594&brand=&keyword=&value=price&valuemin=-1&valuemax=999999999
    // let categorylayer3 = []
    // categories.forEach(layer1 => {
    //     if (layer1.children) {
    //         layer1.children.forEach(layer2 => {
    //             if (layer2.children) {
    //                 layer2.children.forEach(layer3 => {
    //                     categorylayer3.push({id: layer3.value, name: layer3.label, key: layer3.value})
    //                 });
    //             } else {
    //                 categorylayer3.push({id: layer2.value, name: layer2.label, key: layer2.value})
    //             }
    //         });
    //     }
    // })

    // categorylayer3.forEach(item => {
    //     let category = new Category({
    //         id: item.id,
    //         category_name: item.name,
    //         date_renew: Date.now(),
    //         quantity_product: 0,
    //     })

    //     category.save().then(()=>{
    //         console.log('saved')
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // })
    return res.send(categories)
};

exports.renew_category = async (req, res) => {
        // req.params.id
        try {
            Product.deleteMany({primary_category_id: req.query.categoryid}).exec();
    
            const productsByCategory = await crawlerProductsByCategory(req.query.categoryid);

            if (productsByCategory) {
                productsByCategory.forEach(item => {
                    let product = new Product(
                        {
                            id: item.id,
                            name: item.name,
                            price: Number(item.price),
                            seller_id: item.seller_id,
                            brand_name: item.brand_name,
                            thumbnail_url: item.thumbnail_url,
                            primary_category_id: req.query.categoryid,
                            all_time_quantity_sold:  item.visible_impression_info.amplitude.all_time_quantity_sold,
                            category_l1_name: item.visible_impression_info.amplitude.category_l1_name,
                            category_l2_name:  item.visible_impression_info.amplitude.category_l2_name? item.visible_impression_info.amplitude.category_l2_name:null,
                            category_l3_name:  item.visible_impression_info.amplitude.category_l3_name? item.visible_impression_info.amplitude.category_l3_name:null,
                            primary_category_name:  item.visible_impression_info.amplitude.primary_category_name,
                            is_authentic:  item.visible_impression_info.amplitude.is_authentic,
                            number_of_reviews:  item.visible_impression_info.amplitude.number_of_reviews,
                            product_rating:  item.visible_impression_info.amplitude.product_rating,
                            seller_type:  (item.visible_impression_info.amplitude.seller_type == "NONE")? 0:1
                        }
                    );
                
                    product.save().then(()=>{
                        console.log('saved')
                    }).catch((err)=>{
                        console.log(err);
                        res.send({code: 0}).end();
                    })
                });

                await Category.findOneAndUpdate( {id: req.query.categoryid}, {date_renew: Date.now(), quantity_product: productsByCategory.length})
                res.send({code: 1, status: 'Làm mới thành công', quantity_product: productsByCategory.length, date_renew: Date.now()})
            } else {
                res.send({code: 0,  status:'Làm mới thất bại'})
            }
        } catch (error) {
            console.log(error)
        }
    
        
};

exports.get_all_category = async (req, res) => {

    try {
        const category = await Category.find({})

        res.send(category);
    } catch (error) {
        console.log(error)
    }
}