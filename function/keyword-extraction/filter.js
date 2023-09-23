const { response } = require('express');
const fs = require('fs');
var vntk = require('vntk');
var tokenizer = vntk.wordTokenizer();

const stopwords = ["a ha","a-lô","ai","ai ai","ai nấy","alô","amen","anh","bao giờ","bao lâu","bao nhiêu","bao nả","bay biến","biết","biết bao","biết bao nhiêu","biết chừng nào","biết mấy","biết đâu","biết đâu chừng","biết đâu đấy","bà","bài","bác","bây bẩy","bây chừ","bây giờ","bây nhiêu","bèn","béng","bông","bạn","bản","bất chợt","bất cứ","bất giác","bất kì","bất kể","bất kỳ","bất luận","bất nhược","bất quá","bất thình lình","bất tử","bất đồ","bấy","bấy chầy","bấy chừ","bấy giờ","bấy lâu","bấy lâu nay","bấy nay","bấy nhiêu","bập bà bập bõm","bập bõm","bắt đầu từ","bằng","bằng không","bằng nấy","bằng ấy","bển","bệt","bị","bỏ mẹ","bỗng","bỗng chốc","bỗng dưng","bỗng không","bỗng nhiên","bỗng đâu","bộ","bội phần","bớ","bởi","bởi chưng","bởi nhưng","bởi thế","bởi vì","bởi vậy","bức","cao","cha","cha chả","chao ôi","chiếc","cho","cho nên","cho tới","cho tới khi","cho đến","cho đến khi","choa","chu cha","chui cha","chung cục","chung qui","chung quy","chung quy lại","chuyện","chành chạnh","chí chết","chính","chính là","chính thị","chùn chùn","chùn chũn","chú","chú mày","chú mình","chúng mình","chúng ta","chúng tôi","chăn chắn","chăng","chưa","chầm chập","chậc","chắc","chắc hẳn","chẳng lẽ","chẳng những","chẳng nữa","chẳng phải","chết nỗi","chết thật","chết tiệt","chỉ","chỉn","chốc chốc","chớ","chớ chi","chợt","chủn","chứ","chứ lị","coi bộ","coi mòi","con","cu cậu","cuốn","cuộc","càng","các","cái","cây","còn","có","có chăng là","có dễ","có thể","có vẻ","cóc khô","cô","cô mình","công nhiên","cùng","cùng cực","cùng nhau","cùng với","căn","căn cắt","cũng","cũng như","cũng vậy","cũng vậy thôi","cơ","cơ chừng","cơ hồ","cơ mà","cơn","cả","cả thảy","cả thể","cảm ơn","cần","cật lực","cật sức","cậu","cổ lai","của","cứ","cứ việc","cực lực","do","do vì","do vậy","do đó","duy","dào","dì","dù cho","dù rằng","dưới","dạ","dần dà","dần dần","dầu sao","dẫu","dẫu sao","dễ sợ","dễ thường","dở chừng","dữ","em","giữa","gì","hay","hoàn toàn","hoặc","hơn","hầu hết","họ","hỏi","khi","khác","không","luôn","là","làm","lên","lúc","lại","lần","lớn","muốn","mà","mình","mỗi","một","một cách","mới","mợ","ngay","ngay cả","ngay khi","ngay lúc","ngay lập tức","ngay tức khắc","ngay từ","nghe chừng","nghe đâu","nghen","nghiễm nhiên","nghỉm","ngoài","ngoài ra","ngoải","ngày","ngày càng","ngày ngày","ngày xưa","ngày xửa","ngôi","ngõ hầu","ngăn ngắt","ngươi","người","ngọn","ngọt","ngộ nhỡ","nh","nhau","nhiên hậu","nhiều","nhiệt liệt","nhung nhăng","nhà","nhân dịp","nhân tiện","nhé","nhón nhén","như","như chơi","như không","như quả","như thể","như tuồng","như vậy","nhưng","nhưng mà","nhược bằng","nhất","nhất loạt","nhất luật","nhất mực","nhất nhất","nhất quyết","nhất sinh","nhất thiết","nhất tâm","nhất tề","nhất đán","nhất định","nhận","nhỉ","nhỡ ra","những","những ai","những như","nào","này","nên","nên chi","nó","nóc","nói","năm","nơi","nấy","nếu","nếu như","nền","nọ","nớ","nức nở","nữa","oai oái","oái","pho","phè","phóc","phót","phăn phắt","phương chi","phải","phải chi","phải chăng","phắt","phỉ phui","phỏng","phỏng như","phốc","phụt","phứt","qua","qua quít","qua quýt","quyết","quyết nhiên","quyển","quá","quá chừng","quá lắm","quá sá","quá thể","quá trời","quá xá","quá đỗi","quá độ","quá ư","quý hồ","quả","quả là","quả tang","quả thật","quả tình","quả vậy","quả đúng","ra","ra phết","ra sao","ra trò","ren rén","riu ríu","riêng","riệt","rày","ráo","ráo trọi","rén","rích","rón rén","rút cục","răng","rất","rằng","rằng là","rốt cuộc","rốt cục","rồi","rứa","sa sả","sao","sau","sau chót","sau cuối","sau cùng","sau đó","so","song le","suýt","sì","sạch","sất","sắp","sẽ","số","số là","sốt sột","sở dĩ","sự","tanh","tha hồ","than ôi","thanh","theo","thi thoảng","thoạt","thoạt nhiên","thoắt","thuần","thà","thà là","thà rằng","thành ra","thành thử","thái quá","tháng","thì","thì thôi","thình lình","thím","thôi","thúng thắng","thương ôi","thường","thảo hèn","thảo nào","thấy","thẩy","thậm","thậm chí","thật lực","thật ra","thật vậy","thế","thế là","thế mà","thế nào","thế nên","thế ra","thế thì","thế à","thếch","thỉnh thoảng","thỏm","thốc","thốc tháo","thốt","thốt nhiên","thộc","thời gian","thục mạng","thửa","thực ra","thực sự","thực vậy","tiếp theo","tiếp đó","tiện thể","toà","toé khói","toẹt","trong","trên","trước","trước kia","trước nay","trước tiên","trước đây","trước đó","trếu tráo","trển","trệt","trệu trạo","trỏng","trời đất ơi","trừ phi","tuy","tuy nhiên","tuy rằng","tuy thế","tuy vậy","tuyệt nhiên","tuần tự","tuốt luốt","tuốt tuồn tuột","tuốt tuột","tà tà","tênh","tít mù","tò te","tôi","tông tốc","tù tì","tăm tắp","tại","tại vì","tấm","tấn","tất cả","tất thảy","tất tần tật","tất tật","tắp","tắp lự","tọt","tỏ ra","tỏ vẻ","tốc tả","tối ư","tột","tớ","tới","tức thì","tức tốc","từ","từng","tự vì","tựu trung","veo","veo veo","việc","vung thiên địa","vung tàn tán","vung tán tàn","và","vào","vâng","vèo","vì","vì chưng","vì thế","vì vậy","ví bằng","ví dù","ví phỏng","ví thử","vô hình trung","vô kể","vô luận","vô vàn","văng tê","vạn nhất","vả chăng","vả lại","vẫn","vậy","vậy là","vậy thì","về","vị tất","vốn dĩ","với","với lại","vở","vụt","vừa","vừa mới","xa xả","xiết bao","xon xón","xoành xoạch","xoét","xoẳn","xoẹt","xuất kì bất ý","xuất kỳ bất ý","xuể","xuống","xăm xúi","xăm xăm","xăm xắm","xềnh xệch","xệp","à","à ơi","ào","á","á à","ái","ái chà","ái dà","áng","âu là","ô hay","ô hô","ô kê","ô kìa","ôi chao","ôi thôi","ông","úi","úi chà","úi dào","ý","ý chừng","ý da","đang","đi","điều","đành đạch","đáng lí","đáng lý","đáng lẽ","đánh đùng","đáo để","đây","đã","đó","được","đại loại","đại nhân","đại phàm","đại để","đến","đến nỗi","đều","để","ơ","ơ hay","ơ kìa","ơi","ư","ạ","ạ ơi","ấy","ầu ơ","ắt","ắt hẳn","ắt là","ối dào","ối giời","ối giời ơi","ồ","ổng","ớ","ờ","ở","ở trên","ủa",
"ứ hự","ứ ừ","ừ","ử", "với", "phù hợp", "có thể", "các", "hầu hết", "cái", "các", "đã", "có thể", "đó", "tùy", "là",
"và", "như", "khác","đến", "cm", "m", "kg", "•","cho","các", " ͟" ];
// const readProducts = async () => {
//     try {
//         const dataJson = await fs.readFileSync(`./input/data-raw.json`, 'utf8');
//         const data = JSON.parse(dataJson);
//         return data;
//     } catch (err) {
//         console.log(`Error reading file: ${err}`);
//     };
// };

// const loadStopWords = async () => {
//     try {
//         const dataJson = await fs.readFileSync(`./stopwords.json`, 'utf8');
//         const data = JSON.parse(dataJson);

//         return data;
//     } catch (err) {
//         console.log(`Error reading file: ${err}`);
//     };
// }

// Xóa HTML Tag
const removeHTML = (dataRaw) => {
    const data = [];

    dataRaw.forEach(description => {
        var newDescription = description.replace( /(<([^>]+)>)/ig, '');
        data.push(newDescription.replace(/\n/g, ' '))
    });

    return(data);
    
}

// Loai bo stopwords
const removeStopWords = (dataRaw, stopwords) => {
    const data = [];
    dataRaw.forEach(description => {
        var newDescription = description;

        for (var i=0; i<stopwords.length; i++) {
            var stopword = ' ' + stopwords[i] + ' ';
            newDescription = newDescription.replaceAll(stopword, ' ');
        }

        // Xóa khoảng trắng thừa
        newDescription = newDescription.replace(/\s+/g, ' ');

        data.push(newDescription);
    })

    //console.log(data);
    return data;
}

// Chuẩn hóa bảng mã UNICODE
const nomailizeUNICODE = (dataRaw) => {
    const dataFiltered = [];
    dataRaw.forEach(data => {
        // chuyển chuỗi sang unicode tổ hợp
        var newData = data.normalize('NFC');
        
        // Xóa ký tự - liên tiếp
        newData = newData.replace(/-+/g, '');
        newData = newData.replaceAll(',', '');
        newData = newData.replaceAll('.', '');
        newData = newData.replaceAll(':', '');
        newData = newData.replaceAll('*', '');
        newData = newData.replaceAll('(', '');
        newData = newData.replaceAll('+', '');
        newData = newData.replaceAll('~', '');
        newData = newData.replaceAll(')', '');
        newData = newData.replaceAll('•', '');
        newData = newData.replaceAll(';', '');
        newData = newData.replaceAll('͟ ͟', '');
        newData = newData.replaceAll('&', '');

        // Xóa khoảng trắng thừa
        newData = newData.replace(/\s+/g, ' ');

        // xóa số
        //newData = newData.replace(/[0-9]/g, '');
        var regex = /\b[^\s]*\d[^\s]*\b/g;
        newData = newData.replace(regex,'')

        newData = newData.toLowerCase();

        // Xóa ký tự đặc biệt
       //newData = newData.replace(/([^0-9a-z-\s])/g, '');

        dataFiltered.push(newData);
    })

    return dataFiltered
}

const wordTokenize = (dataRaw) => {
    return tokenizer.tag(dataRaw);
}

const indicatingWords = (wordAfterTokenize, wordBeforeTokenize) => {
    const indicates = []
    wordAfterTokenize.forEach(word => {
        if (word.includes(' ')) {indicates.push(word)}
    });

    for (var i = 0; i<wordAfterTokenize.length-1; i++) {
        indicates.push(wordAfterTokenize[i] + ' ' + wordAfterTokenize[i+1])
    }

    for (var i = 0; i<wordAfterTokenize.length-2; i++) {
        indicates.push(wordAfterTokenize[i] + ' ' + wordAfterTokenize[i+1] + ' ' + wordAfterTokenize[i+2])
    }

    for (var i = 0; i<wordAfterTokenize.length-3; i++) {
        indicates.push(wordAfterTokenize[i] + ' ' + wordAfterTokenize[i+1] + ' ' + wordAfterTokenize[i+2] + ' ' + wordAfterTokenize[i+3])
    }

    // check valid indicates
    const finalIndicates = [];
    indicates.forEach(item => {
        if (wordBeforeTokenize.includes(item)) {
            finalIndicates.push(item)
        }
    });

    //filterIndicatesByQuantityWord(finalIndicates)
    //return filterIndicatesByQuantityWord(finalIndicates);

    return finalIndicates;
}

const frequency = (indicates) => {
    const countIndicates = [];
    //dem so lan xuat hien
    indicates.forEach(indicate => {
        var count = 0;
        for (var i=0; i<indicates.length; i++) {
            if (indicate == indicates[i]) count++
        }
        countIndicates.push({
            indicate: indicate,
            quantity: count,
            freq: count/indicates.length
        })
    });

    // Sắp xếp theo word để lọc trùng
    const sortIndicates = countIndicates.sort((b, a) => {
        return a?.freq - b?.freq;
    })

    const filterIndicates = [...new Set(indicates)];
    // Loại bỏ data trùng lặp
    const filteredIndicates = [];
    for (var i=0; i<filterIndicates.length; i++) {
        for (var j = 0; j<sortIndicates.length; j++) {
            if (filterIndicates[i] == sortIndicates[j].indicate) {
                filteredIndicates.push(sortIndicates[j]);
                break;
            }
        }
    }

    const sortFreq = filteredIndicates.sort((b, a) => {
        return a?.freq - b?.freq;
    })

    return sortFreq;
}

//loc indicate >=3
const filterFrequency = (indicates) => {
    const finalIndicates = [];

    indicates.forEach(item => {
        if (item.quantity >0) {
            finalIndicates.push(item)
        }
    });

    return finalIndicates;
} 

//loc indicate > 2 words
const filterIndicatesByQuantityWord = (indicates) => {
    const finalIndicates = [];
    indicates.forEach(indicate => {
        const remove1space = indicate.indicate.replace(' ', '')
        if(remove1space.includes(' ')) finalIndicates.push(indicate);
    });

    return finalIndicates
}

const calculateTFIDF = (indicates, descriptions) => {
    const finalIndicates = [];
    indicates.forEach(indicate => {
        let countAppear = 0;

        descriptions.forEach( description=> {
            if (description.includes(indicate.indicate)) {
                countAppear++;
            }
        });
        let idf =  Math.log(descriptions.length/(countAppear + 1))
        finalIndicates.push({
            indicate: indicate.indicate,
            quantity: indicate.quantity,
            freq: indicate.freq,
            idf: idf,
            countAppear: countAppear,
            tfidf: indicate.freq*idf,
            descriptionsLength: descriptions.length
        })
    });
    return finalIndicates;
}

const removeDuplicateIndicate = (indicates) => {
    const indicateValueBefore = [];
    indicates.forEach(indicate => {
        indicateValueBefore.push(indicate.indicate)
    });

    const indicateValueAfter = [...new Set(indicateValueBefore)];

    
    const finalIndicates = [];
    for (var i=0; i<indicateValueAfter.length; i++) {
        for (var j=0; j<indicates.length; j++) {
            if(indicateValueAfter[i] == indicates[j].indicate) {
                finalIndicates.push(indicates[j]);
                break;
            }
        }
    }

    return finalIndicates;
}

const getKeywords = async (rawData) => {
    //const rawData = await readProducts();

    // const rawData = [`Áo khoác len với Cadigan basic thiết kế theo đúng chuẩn Cadigan không có chút biến tấu. Chất vải len mềm mại, cổ hình chữ V, tay áo và gấu áo bo và màu đơn sắc cùng với hàng cúc đậm chất Cadigan. Chiếc áo Cardigan mang nét thanh lịch, nhẹ nhàng có thể kết hợp với hầu hết 
    // các item thời trang khác. Từ chững chạc như quần âu, chân váy bút chì,…cho đến bánh bèo như váy babydoll, váy suông dài… Chiếc áo khoác 
    // len Cagigan basic chắc chắn là item không thể thiếu trong tủ đồ của mỗi cô nàng. Màu sắc: Xanh ngọc, be, xanh lơ, vàng, xám, hồng, đỏ, xanh da trời, nâu nhạt, đen, nâu đậm, trắng Size: S đến 2XL S với áo dài 56, ngực 84, vai 33, tay áo dài 56 phù hợp cao 150cm đến 155cm M với áo dài 58, ngực 86, vai 34 ,tay áo dài 56 phù hợp cao 156cm đến 160cm L với áo dài 60 ,ngực 88 ,vai 36 , tay áo dài 57 phù hợp cao 
    // 161cm đến 165cm XL với áo dài 62 , ngực 90 ,vai 37 ,tay áo dài 58 phù hợp cao 166cm đến 170cm 2XL với áo dài 63 ,ngực 92, vai 39, tay áo dài 59 phù hợp cao 171cm đến 175cm Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....`]

    // const stopwords = await loadStopWords();

    const removedHTML = removeHTML(rawData);

    const removedStopWords = removeStopWords(removedHTML, stopwords);

    const nomailizedUNICODE = nomailizeUNICODE(removedStopWords);

    const termFrequency = [];
    const inverseDocumentFrequency = [];
    // tinh tan suat cua 1 tu trong 1 doan van
    for (var i=0; i<nomailizedUNICODE.length; i++) {

        //tokenize doan van
        // input: string
        //output: array string
        const wordAfterTokenize = wordTokenize(nomailizedUNICODE[i]);

        // Phan chia thanh cac ung vien
        //input: array string
        //output: array indicate
        const indicates = indicatingWords(wordAfterTokenize, nomailizedUNICODE[i]);

        // tinh tan suat
        // output: array {indicate, quantity, req}
        const calFrequency = frequency(indicates)

        //loc cac indicate co quantity >=3
        const filteredFrequency = filterFrequency(calFrequency);

        termFrequency.push(filteredFrequency);
    }

    //tinh TF-IDF tung decription
    termFrequency.forEach(item => {
        inverseDocumentFrequency.push(calculateTFIDF(item, nomailizedUNICODE))
    });

    let allIndicates = [];
    for(var i=1; i<inverseDocumentFrequency.length; i++) {
        allIndicates = allIndicates.concat(inverseDocumentFrequency[i]);
    }

    const sortIndicatesByTFIDFScore = allIndicates.sort((b, a) => {
        return a?.tfidf - b?.tfidf;
    })

    const removedDuplicateIndicate = removeDuplicateIndicate(sortIndicatesByTFIDFScore);

    
    return filterIndicatesByQuantityWord(removedDuplicateIndicate);
    
}

module.exports = getKeywords;