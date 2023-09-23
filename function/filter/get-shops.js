const fs = require('fs');

const category = {"cateID": 2549,
"cateName": "Đồ Chơi - Mẹ & Bé"};

const shops = [];

const readData = async () => {
    try {
        const data = await fs.readFileSync(`../crawler/${category.cateID}-${category.cateName}.json`, 'utf8');
        return data;
    } catch (err) {
        console.log(`Error reading file: ${err}`);
    };
};

const filterProductsByShop = async () => {
    const dataJson = await readData();
    const products = JSON.parse(dataJson);

    for (var i = 0; i< products.length; i++) {
        products[i].filter((product) => {
            if (!shops.includes(product.seller_id)) {
                shops.push(product.seller_id)
            }
        })
    }

    const fileName = `./id-shops/${category.cateID}-${category.cateName}-shop.json`;

        fs.writeFile(fileName, JSON.stringify(shops, null, 2), (err) => {
            if (err) {
            console.log(err);
            } else {
            console.info("JSON saved to: ", fileName);
            }
        });
};

filterProductsByShop();