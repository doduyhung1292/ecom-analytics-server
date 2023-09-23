const COOKIE = "_trackity=656e218c-4b74-f772-b856-99ec4bcfd7a5; _gcl_au=1.1.1271332961.1687964615; _fbp=fb.1.1687964615151.1043906931; __uidac=5d272b23344a5ff242b30d1901340b42; __iid=749; __su=0; _hjSessionUser_522327=eyJpZCI6ImM3MjJlZDIxLWY1NTAtNTQ3NC1hOWVjLTFlZmJiY2YyY2U3ZiIsImNyZWF0ZWQiOjE2ODc5NjQ2MTUzODAsImV4aXN0aW5nIjp0cnVlfQ==; cto_bundle=VJ6aNV9CMTk0WkE3aElGYjlVR0I2aTdVSmpvQ0Zjd2V3YyUyRmgyWmh3bDlvWiUyRmg0JTJGanpHb1BSUmIlMkJYTldwYWslMkJaQlM3a2lmQURZNkJFU3dReUduTlJkaG5QRzNRTGlOM3dFTTZEVWJYNDFrWW8zbWRqdmlzd2ttTGt1VHpVbzRWTE5ISUNGY3hmakVUNDFramVTMVdpT2hzc3ZRJTNEJTNE; TOKENS={%22access_token%22:%2213OSLYQaPDtVxHdZgrbJmoTXvfizIBCn%22}; _gid=GA1.2.559633540.1692850344; TKSESSID=3d23b7fbe47c9b94baae21cc39e2a79b; delivery_zone=Vk4wMzQwMjQwMTM=; tiki_client_id=943136745.1687964611; _hjIncludedInSessionSample_522327=0; _hjSession_522327=eyJpZCI6ImE4OThlNzRjLTVkZTUtNDQxYS1hOTg1LTQ3NzllNzhjMDJkNiIsImNyZWF0ZWQiOjE2OTI4NjczMzQ2ODYsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; amp_99d374=PXYd7G05gb9bhAByFG3IFP...1h8jc2tmu.1h8jchpa8.3c.62.9e; _ga_GSD4ETCY1D=GS1.1.1692867334.14.1.1692867818.51.0.0; _ga=GA1.1.943136745.1687964611";

// const shopInfo = [];

// const crawlProductsByShop = async (username, page) => {
//     try {
//         const res = await fetch(
//             `https://api.tiki.vn/v2/seller/stores/${username}/products?limit=1&page=${page}`,
//             {
//               headers: {
//                 accept: "*/*",
//                 "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
//                 "Accept-Encoding": "gzip, deflate, br",
//                 "Cache-Control": "max-age=0",
//                 "Sec-Ch-Ua": `"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"`,
//                 "Sec-Ch-Ua-Mobile": "?0",
//                 "Sec-Ch-Ua-Platform": "Windows",
//                 "Sec-Fetch-Dest": "document",
//                 "Sec-Fetch-Mode": "navigate",
//                 "Sec-Fetch-Site": "none",
//                 "Sec-Fetch-User": "?1",
//                 "Upgrade-Insecure-Requests": 1,
//                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54",
//                 cookie: COOKIE,
//               },
//               referrerPolicy: "strict-origin-when-cross-origin",
//               body: null,
//               method: "GET",
//               mode: "cors",
//             }
//             );
//           const data = await res.json();
//           if(data) {
//             return data.data;
//         } else {
//             return {};
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return {};
//     }
// }

// // lấy danh mục sản phẩm
// const crawlCategoriesByShop = async (IDShop) => {
//     try {
//         const res = await fetch(
//             `https://api.tiki.vn/seller-store-v2/categories?seller_id=${IDShop}`,
//             {
//               headers: {
//                 accept: "*/*",
//                 "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
//                 "Accept-Encoding": "gzip, deflate, br",
//                 "Cache-Control": "max-age=0",
//                 "Sec-Ch-Ua": `"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"`,
//                 "Sec-Ch-Ua-Mobile": "?0",
//                 "Sec-Ch-Ua-Platform": "Windows",
//                 "Sec-Fetch-Dest": "document",
//                 "Sec-Fetch-Mode": "navigate",
//                 "Sec-Fetch-Site": "none",
//                 "Sec-Fetch-User": "?1",
//                 "Upgrade-Insecure-Requests": 1,
//                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54",
//                 cookie: COOKIE,
//               },
//               referrerPolicy: "strict-origin-when-cross-origin",
//               body: null,
//               method: "GET",
//               mode: "cors",
//             }
//             );
//           const data = await res.json();
//           if(data) {
//             return data.data;
//         } else {
//             return {};
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return {};
//     }
// }

// lấy thông tin shop
const CrawlShopDetails = async (IDShop) => {
    try {
        const res = await fetch(
            `https://tiki.vn/api/shopping/v2/widgets/seller?seller_id=${IDShop}`,
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
          const data = await res.json();
          
          return data.data.seller;
    }
    catch (err) {
        console.log(err);
        return {};
    }
}

// const preCrawlProducts = async (username, IDShop) => {
//     var i = 0;
//     var products_id = [];
//     var products = [];

//     do {
//         i++;
//         var productPerPage = await crawlProductsByShop(username, i);
//         productPerPage.forEach(product => {
//             products_id.push(product.id)
//         });
        
//     } while (
//         productPerPage.length !== 0
//     )

//      return products;
// };

// Lấy info 1 product
//  const getInfoProduct = async (productId, IDShop) => {
//     try {
//         const res = await fetch(
//             `https://tiki.vn/api/v2/products/${productId}?platform=web&spid=${IDShop}`,
//             {
//               headers: {
//                 accept: "*/*",
//                 "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
//                 "Accept-Encoding": "gzip, deflate, br",
//                 "Cache-Control": "max-age=0",
//                 "Sec-Ch-Ua": `"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"`,
//                 "Sec-Ch-Ua-Mobile": "?0",
//                 "Sec-Ch-Ua-Platform": "Windows",
//                 "Sec-Fetch-Dest": "document",
//                 "Sec-Fetch-Mode": "navigate",
//                 "Sec-Fetch-Site": "none",
//                 "Sec-Fetch-User": "?1",
//                 "Upgrade-Insecure-Requests": 1,
//                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54",
//                 cookie: COOKIE,
//               },
//               referrerPolicy: "strict-origin-when-cross-origin",
//               body: null,
//               method: "GET",
//               mode: "cors",
//             }
//             );
            
//             const data = res.json();

//           if(data) {
//             return {
//                 "id": data.id,
//                 "name": data.name,
//                 "price": data.price,
//                 "rating_average": data.rating_average,
//                 "review_count": data.review_count,
//                 "categories": data.categories?.id,
//                 "all_time_quantity_sold": data.all_time_quantity_sold,
//                 "description": data.description
//             };
//         } else {
//             return;
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return {};
//     }
// }

//CrawlShopDetails();
module.exports = CrawlShopDetails;