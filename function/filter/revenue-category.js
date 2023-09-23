const fs = require('fs');

const CrawlShopDetails = require('./get_info_shop.js');

// Lấy thông tin và sản phẩm của shop
const getProductsStatistics = async (products) => {
    let idMap = new Map();

    let filteredProducts = products.filter(product => {
        if(!idMap.has(product.id)) {
            idMap.set(product.id, true);
            return true;
        }
        return false;
    });

    const topProducts = await getTopProducts(filteredProducts);
    const topShops = await getTopShops(filteredProducts);
    const topBrands = getTopBrands(filteredProducts);
    const priceRange = getPriceRange(filteredProducts);
    const overview = getOverview(filteredProducts);

    return {
        topProducts: topProducts,
        topShops: topShops,
        topBrands: topBrands,
        priceRange: priceRange,
        overview: overview
    }
}

const getOverview = (products) => {
    let countProductsHasSold = 0;
    let countQuantitySold = 0;
    let shopHasSold = [];
    let categoryName = '';
    products.forEach(product => {
        if (product.all_time_quantity_sold > 0) {
            countProductsHasSold +=1;
            countQuantitySold += product.all_time_quantity_sold;
            shopHasSold.push(product.seller_id)
            categoryName = product.primary_category_name
        }
    });

    let shopHasSoldUnique = new Set(shopHasSold);

    console.log(shopHasSoldUnique)
    return {
        count_products_has_sold: countProductsHasSold,
        count_shops_has_sold: shopHasSoldUnique.size,
        quantity_sold: countQuantitySold,
        category_name: categoryName
    }
}
// Lấy top sản phẩm
const getTopProducts = async (products) => {

    const productsFiltered = products.sort((b, a) => {
        return a?.all_time_quantity_sold - b?.all_time_quantity_sold;
    })

    const top10Products = [];

    if (productsFiltered.length !== 0) {
        let number_of_products = 0;
        if (productsFiltered.length >= 10) {
            number_of_products = 10
        } else {
            number_of_products = productsFiltered.length
        }
        for (var i = 0;i <number_of_products; i++) {
            let infomationShop = await CrawlShopDetails(productsFiltered[i]?.seller_id);
            top10Products.push({
                brand_name: productsFiltered[i].brand_name,
                all_time_quantity_sold: productsFiltered[i].all_time_quantity_sold,
                primary_category_name: productsFiltered[i].primary_category_name,
                product_rating: productsFiltered[i].product_rating,
                thumbnail_url: productsFiltered[i].thumbnail_url,
                price: productsFiltered[i].price,
                number_of_reviews: productsFiltered[i].number_of_reviews,
                name: productsFiltered[i].name,
                is_authentic: productsFiltered[i].is_authentic,
    
               shop_name: infomationShop.name,
               shop_url: infomationShop.url,
            });
        }
    
        return top10Products; 
    } else {
        return []
    }
}

const getTopShops = async (products) => {
    const sellerId = [];

    products.forEach(product => {
        sellerId.push(product.seller_id)
    });

    const sellerIdUnique = new Set(sellerId);

    const sellers = [];
    sellerIdUnique.forEach(sellerid => {
        let count = 0;
        for (var i=0; i<products.length; i++) {
            if (products[i].seller_id == sellerid) {
                count += products[i].all_time_quantity_sold
            }
        }

        sellers.push ({
            seller_id: sellerid,
            quantity_sold: count
        })
    });

    const sellerSortBySold = sellers.sort((b, a) => {
        return a?.quantity_sold - b?.quantity_sold;
    })

    const top10Sellers = [];
    let number_of_shops = 0;
    if (sellerSortBySold.length >=10) {
        number_of_shops = 10
    } else {
        number_of_shops = sellerSortBySold.length
    }
    for (var i=0; i<number_of_shops; i++) {
        top10Sellers.push(sellerSortBySold[i])
    }

    const sellerInfomation = []

    for (var i=0; i<top10Sellers.length; i++) {
        let infomationShop = await CrawlShopDetails(top10Sellers[i]?.seller_id);
        sellerInfomation.push({
            id: infomationShop.id,
            quantity_sold: top10Sellers[i]?.quantity_sold,
            name:  infomationShop.name,
            icon:  infomationShop.icon,
            avg_rating_point:  infomationShop.avg_rating_point,
            days_since_joined:  infomationShop.days_since_joined,
            is_official:  infomationShop.is_official,
            review_count:  infomationShop.review_count,
            store_level:  infomationShop.store_level,
            total_follower:  infomationShop.total_follower,
            url:  infomationShop.url
        })
    }


    return sellerInfomation;
}

const getTopBrands = (products) => {
    const brandsName = [];

    products.forEach(product => {
        brandsName.push(product.brand_name.trim())
    });

    const brandNameUnique = new Set(brandsName);

    const brands = [];
    brandNameUnique.forEach(brand => {
        let countSold = 0;
        let countProduct = 0;
        for (var i=0; i<products.length; i++) {
            if (products[i].brand_name.trim() == brand) {
                countSold += products[i].all_time_quantity_sold;
                countProduct +=1;
            }
        }

        brands.push ({
            brand_name: brand,
            quantity_sold: countSold,
            quantity_product: countProduct
        })
    });

    const brandSortBySold = brands.sort((b, a) => {
        return a?.quantity_sold - b?.quantity_sold;
    })

    return brandSortBySold;
}

const getPriceRange = (products) => {
    const range = [0, 50000, 100000, 150000, 200000, 250000,300000,350000, 400000, 450000, 500000];
    
    const rangePrice = [];
    for (var i=0; i<range.length-1; i++) {
        let countSold = 0;
        let countProduct = 0;
        for (var j=0; j<products.length; j++) {
            if ((products[j].price >= range[i]) && (products[j].price <= range[i + 1])) {
                countProduct += 1;
                countSold += products[j].all_time_quantity_sold;}
            
        }

        rangePrice.push({
            label: `${range[i]}-${range[i+1]}`,
            quantity_sold: countSold,
            quantity_product: countProduct
        })
    }

    return rangePrice;
}
module.exports = getProductsStatistics;