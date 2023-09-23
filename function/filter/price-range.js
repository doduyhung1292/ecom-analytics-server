const fs = require('fs');

const range = [
    {start: 0, end: 50000},
    {start: 50001, end: 100000},
    {start: 100001, end: 200000},
]

const category = {"cateID": 2549,
"cateName": "Đồ Chơi - Mẹ & Bé"};

const readProducts = async () => {
    try {
        const dataJson = await fs.readFileSync(`../crawler/${category.cateID}-${category.cateName}.json`, 'utf8');
        const data = JSON.parse(dataJson);
        return data;
    } catch (err) {
        console.log(`Error reading file: ${err}`);
    };
};

const filterRange = async () => {
    try {
        const productsArr = await readProducts();

        let listOfProducts = [];

        const totalRevenue = 0;
        const quantity = 0;

        // Nối các page sản phẩm
        for (var i = 0; i<productsArr.length; i++) {
            listOfProducts = listOfProducts.concat(productsArr[i])
        }

        const rangeRevenue = [];

        for (var j=0; j<range.length; j++) {
            let totalRevenue = 0;
            let totalSold = 0;
            for (var i = 0; i<listOfProducts.length; i++) {
                if (listOfProducts[i].price<range[j].end && listOfProducts[i].price>range[j].start) {
                        if (listOfProducts[i].quantity_sold) {
        
                            totalSold = totalSold + listOfProducts[i].quantity_sold?.value;
        
                            totalRevenue += listOfProducts[i].quantity_sold?.value*listOfProducts[i].price;
                        }
                }
            }
            rangeRevenue.push({
                rangeStart: range[j].start,
                rangeEnd: range[j].end,
                totalSold: totalSold,
                totalRevenue: totalRevenue
            })





        }

        return rangeRevenue;

    } catch (error) {
        console.log(`Error reading file: ${error}`);
    }
}

// Lấy thông tin và sản phẩm của shop
const rangePrice = async () => {
    const productsFiltered = await filterRange();

    const fileName = `./range-price/${category.cateID}-${category.cateName}.json`;

    fs.appendFile(fileName, JSON.stringify(productsFiltered, null, 2), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.info("JSON saved to: ", fileName);
        }
    });
        
}

rangePrice();