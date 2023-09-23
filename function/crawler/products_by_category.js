const COOKIE = "_trackity=656e218c-4b74-f772-b856-99ec4bcfd7a5; _gcl_au=1.1.1271332961.1687964615; _fbp=fb.1.1687964615151.1043906931; __uidac=5d272b23344a5ff242b30d1901340b42; __iid=749; __iid=749; __su=0; __su=0; __R=1; _hjSessionUser_522327=eyJpZCI6ImM3MjJlZDIxLWY1NTAtNTQ3NC1hOWVjLTFlZmJiY2YyY2U3ZiIsImNyZWF0ZWQiOjE2ODc5NjQ2MTUzODAsImV4aXN0aW5nIjp0cnVlfQ==; __tb=0; _ga_W6PZ1YEX5L=GS1.1.1692893541.1.1.1692893568.0.0.0; _gaexp=GAX1.2.2nrlWQRQQV2Lf7i7ZJqiMA.19690.1; __utm=source%3Daccesstrade%7Cmedium%3Dtiki-aff%7Ccampaign%3DAFF_NBR_ACT_UNK_TIKIVN-TNWGVSKG_ALL_VN_ALL_UNK_UNK_TAPX.b9c70e87-a6cf-4614-8d2f-52ad0f233df4_TAPU.7e816ab8-b482-4a28-bd38-1b2a6d1159b8; __utm=source%3Daccesstrade%7Cmedium%3Dtiki-aff%7Ccampaign%3DAFF_NBR_ACT_UNK_TIKIVN-TNWGVSKG_ALL_VN_ALL_UNK_UNK_TAPX.b9c70e87-a6cf-4614-8d2f-52ad0f233df4_TAPU.7e816ab8-b482-4a28-bd38-1b2a6d1159b8; TIKI_RECOMMENDATION=84c2b86519af80066c25cbbd60e4fb61; cto_bundle=WqmPGF9CMTk0WkE3aElGYjlVR0I2aTdVSmppZk5YdklEUncyZHd2Nmh2OWRxVzJmanJQTjFwb2VPNVY0Y3ZXaCUyQjU5dUlYaiUyRmtoc05yQkpnaGVSbHJLWG53ZSUyQjdhUXRuNmQxNXYlMkZQN3p4MGJSVFA4b2trd2g1JTJCa2RZV05NQnJCa3FNJTJCNFdNQVMlMkZzNDRFc2t1SkZFS1NZU2g0USUzRCUzRA; __RC=4; TKSESSID=557ae59d6b897ed4c8bff04a225891be; __IP=2884711280; dtdz=6bcf8b64-bc11-4de5-8b22-46bb425de3fc; TOKENS={%22access_token%22:%2213OSLYQaPDtVxHdZgrbJmoTXvfizIBCn%22}; delivery_zone=Vk4wMzQwMjQwMTM=; _gid=GA1.2.1688984649.1694742718; tiki_client_id=943136745.1687964611; _hjIncludedInSessionSample_522327=0; _hjSession_522327=eyJpZCI6IjU0OWZiYjQ4LTllNWUtNDYyMi1hMDk1LTZiYjI5YjRmYzhhZSIsImNyZWF0ZWQiOjE2OTQ3NDI3MjExOTEsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; _ga_GSD4ETCY1D=GS1.1.1694742720.49.1.1694742749.31.0.0; _ga=GA1.1.943136745.1687964611; __uif=__uid%3A8321020022884703722%7C__ui%3A-1%7C__create%3A1692102002; amp_99d374=PXYd7G05gb9bhAByFG3IFP...1hab8j1ib.1hab8m7pe.20p.2nn.4og";
const fs = require("fs");

// const categories = [
//     {"cateID": 27594,
//     "cateName": "Áo cardigan nữ"},
    // {"cateID": 2549,
    // "cateName": "Đồ Chơi - Mẹ & Bé"},
    // {"cateID": 44792,
    // "cateName": "NGON"},
    // {"cateID": 1789,
    // "cateName": "Điện Thoại - Máy Tính Bảng"},
    // {"cateID": 1520,
    // "cateName": "Làm Đẹp - Sức Khỏe"},
    // {"cateID": 1882,
    // "cateName": "Điện Gia Dụng"},
    // {"cateID": 931,
    // "cateName": "Thời trang nữ"},
    // {"cateID": 915,
    // "cateName": "Thời trang nam"},
    // {"cateID": 1703,
    // "cateName": "Giày - Dép nữ"},
    // {"cateID": 976,
    // "cateName": "Túi thời trang nữ"},
    // {"cateID": 1686,
    // "cateName": "Giày - Dép nam"},
    // {"cateID": 27616,
    // "cateName": "Túi thời trang nam"},
    // {"cateID": 6000,
    // "cateName": "Balo và Vali"}, 
    // {"cateID": 27498,
    // "cateName": "Phụ kiện thời trang"}, 
    // {"cateID": 8371,
    // "cateName": "Đồng hồ và Trang sức"},
    // {"cateID": 1846,
    // "cateName": "Laptop - Máy Vi Tính - Linh kiện"},
    // {"cateID": 1883,
    // "cateName": "Nhà Cửa - Đời Sống"},
    // {"cateID": 17166,
    // "cateName": "Cross Border - Hàng Quốc Tế"},  
    // {"cateID": 4384,
    // "cateName": "Bách Hóa Online"}, 
    // {"cateID": 1815,
    // "cateName": "Thiết Bị Số - Phụ Kiện Số"}, 
    // {"cateID": 11312,
    // "cateName": "Voucher - Dịch vụ"},    
    // {"cateID": 8594,
    // "cateName": "Ô Tô - Xe Máy - Xe Đạp"},  
    // {"cateID": 8322,
    // "cateName": "Nhà Sách Tiki"}, 
    // {"cateID": 4221,
    // "cateName": "Điện Tử - Điện Lạnh"},    
    // {"cateID": 1975,
    // "cateName": "Thể Thao - Dã Ngoại"}, 
    // {"cateID": 1801,
    // "cateName": "Máy Ảnh - Máy Quay Phim"}, 
    // {"cateID": 54042,
    // "cateName": "Sản phẩm Tài chính - Bảo hiểm"}         
// ]; 

const crawlerProductsByCategory = async (categoryID) => {
    const productsArrayByCategory = [];
        const numberPage = await getNumberPage(categoryID, 1);
        for (i=1; i<=numberPage; i++) {
            const productsArray = await getProductByPage(categoryID, i);
            productsArrayByCategory.push(productsArray);
        }
    
    //join san pham crawl tu cac page
    const finalProducts = []
    for (var i=0; i<productsArrayByCategory.length; i++) {
        for (var j=0; j<productsArrayByCategory[i].length; j++) {
            finalProducts.push(productsArrayByCategory[i][j])
        }
    }
    return finalProducts;
}

// get number page of category
const getNumberPage = async (categoryID, pageNumber) => {
    try {
        console.log( `https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=656e218c-4b74-f772-b856-99ec4bcfd7a5&category=${categoryID}&page=${pageNumber}&sort=top_seller`)
        const res = await fetch(
            `https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=656e218c-4b74-f772-b856-99ec4bcfd7a5&category=${categoryID}&page=${pageNumber}&sort=top_seller`,
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
          
          if(data) {
            return data.paging?.last_page
   
        } else {
            return {};
        }
    }
    catch (err) {
        console.log(err);
        return {};
    }
}


const getProductByPage = async (categoryID, pageNumber) => {
    try {
        const res = await fetch(
            `https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=656e218c-4b74-f772-b856-99ec4bcfd7a5&category=${categoryID}&page=${pageNumber}&sort=top_seller`,
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
          if(data) {
            return data.data;
        } else {
            return {};
        }
    }
    catch (err) {
        console.log(err);
        return {};
    }
}

module.exports = crawlerProductsByCategory;