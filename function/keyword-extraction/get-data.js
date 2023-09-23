const fs = require('fs');
const COOKIE = "_trackity=656e218c-4b74-f772-b856-99ec4bcfd7a5; _gcl_au=1.1.1271332961.1687964615; _fbp=fb.1.1687964615151.1043906931; __uidac=5d272b23344a5ff242b30d1901340b42; __iid=749; __su=0; _hjSessionUser_522327=eyJpZCI6ImM3MjJlZDIxLWY1NTAtNTQ3NC1hOWVjLTFlZmJiY2YyY2U3ZiIsImNyZWF0ZWQiOjE2ODc5NjQ2MTUzODAsImV4aXN0aW5nIjp0cnVlfQ==; cto_bundle=VJ6aNV9CMTk0WkE3aElGYjlVR0I2aTdVSmpvQ0Zjd2V3YyUyRmgyWmh3bDlvWiUyRmg0JTJGanpHb1BSUmIlMkJYTldwYWslMkJaQlM3a2lmQURZNkJFU3dReUduTlJkaG5QRzNRTGlOM3dFTTZEVWJYNDFrWW8zbWRqdmlzd2ttTGt1VHpVbzRWTE5ISUNGY3hmakVUNDFramVTMVdpT2hzc3ZRJTNEJTNE; TOKENS={%22access_token%22:%2213OSLYQaPDtVxHdZgrbJmoTXvfizIBCn%22}; _gid=GA1.2.559633540.1692850344; TKSESSID=3d23b7fbe47c9b94baae21cc39e2a79b; delivery_zone=Vk4wMzQwMjQwMTM=; tiki_client_id=943136745.1687964611; _hjIncludedInSessionSample_522327=0; _hjSession_522327=eyJpZCI6ImE4OThlNzRjLTVkZTUtNDQxYS1hOTg1LTQ3NzllNzhjMDJkNiIsImNyZWF0ZWQiOjE2OTI4NjczMzQ2ODYsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; amp_99d374=PXYd7G05gb9bhAByFG3IFP...1h8jc2tmu.1h8jchpa8.3c.62.9e; _ga_GSD4ETCY1D=GS1.1.1692867334.14.1.1692867818.51.0.0; _ga=GA1.1.943136745.1687964611";

const crawler = async () => {
    const data = await readProducts();
    const products = [];

    for (var i = 0; i<2; i++) {
        for (var j = 0; j<data[i].length; j++){
            const product = await getInfoProduct(data[i][j].id, data[i][j].seller_id);
            products.push(product.description);
        }
       
    }

    const fileName = `./input/data-raw.json`;

    fs.writeFile(fileName, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.info("JSON saved to: ", fileName);
        }
    });
}

const readProducts = async () => {
    try {
        const dataJson = await fs.readFileSync(`../crawler/27594-Áo cardigan nữ.json`, 'utf8');
        const data = JSON.parse(dataJson);
        return data;
    } catch (err) {
        console.log(`Error reading file: ${err}`);
    };
};


// Lấy info 1 product
 const getInfoProduct = async (productId, IDShop) => {
    try {
        const res = await fetch(
            `https://tiki.vn/api/v2/products/${productId}?platform=web&spid=${IDShop}`,
            {
              headers: {
                accept: "*/*",
                "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "gzip, deflate, br",
                "Cache-Control": "max-age=0",
                "Sec-Ch-Ua": `"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"`,
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": "Windows",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": 1,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54",
                cookie: COOKIE,
              },
              referrerPolicy: "strict-origin-when-cross-origin",
              body: null,
              method: "GET",
              mode: "cors",
            }
            );
            
            const data = res.json();

          if(data) {
            return data;
        } else {
            return;
        }
    }
    catch (err) {
        console.log(err);
        return {};
    }
}


crawler();