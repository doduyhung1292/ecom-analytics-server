const Account = require('../models/Account.model');
const generateUniqueId = require('generate-unique-id');
const md5 = require('md5')

//Simple version, without validation or sanitation
exports.account_signup = async function (req, res) {
    try {
        let infomation = req.body;
        let newId = generateUniqueId();
        const dateSignUp = Date.now()
        const accountFiltered = await Account.find({mail: infomation.mail}).select('password');
        console.log(accountFiltered)
        if (accountFiltered.length == 0) {
            let account = new Account(
                {
                    id: newId,
                    phone_number: infomation.phone_number,
                    mail: infomation.mail,
                    username: infomation.username,
                    password: md5(infomation.password),
                    date_signup: dateSignUp
                }
            );
        
            account.save().then(()=>{
                res.send({
                    code: 1,
                    id: newId,
                    phone_number: infomation.phone_number,
                    mail: infomation.mail,
                    username: infomation.username,
                    date_signup: dateSignUp
                })
            }).catch((err)=>{
                console.log(err);
                res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm dữ liệu vào database!' }).end();
            })
        } else {
            res.send({code: 0, status: 'Email đã được sử dụng.'})
        }
    } catch (error) {
        console.log(error)
    }
    
};

exports.account_login = async function (req, res) {
    try {
        let infomation = req.body;

        const accountFiltered = await Account.find({username: infomation.username});
        console.log(accountFiltered)
        if (accountFiltered.length == 0) res.send({statusCode:0, status:'Không tìm thấy tài khoản'}).end();

        if ((accountFiltered.length !== 0) && (accountFiltered[0].password == md5(infomation.password))) {
            res.send({
            statusCode: 1, 
            status:'Đăng nhập thành công', 
            user: { 
                id: accountFiltered[0].id,
                phone_number: accountFiltered[0].phone_number,
                mail: accountFiltered[0].mail,
                username: accountFiltered[0].username,
                date_signup: accountFiltered[0].date_signup
            }})
        } else {
            res.send({statusCode: 0, status:'Mật khẩu đăng nhập sai'})
        }
    } catch (error) {
        console.log(error)
    }
};

exports.account_admin_login = async function (req, res) {
    try {
        let infomation = req.body;
        if ((infomation.username == 'admin') && (infomation.password == 'admin')) {
            res.send({statusCode: 1, status:'Đăng nhập thành công'})
        } else {
                res.send({statusCode: 0, status:'Thông tin đăng nhập sai'})
        }
    } catch (error) {
        console.log(error)
    }
};

exports.account_edit = async function (req, res) {
    try {
        let infomation = req.body;

        const account = await Account.find({id: infomation.id})
        if (!account) {
            return res.status(404).json;
        } else {
            const response = Account.updateOne(infomation);
            return res.send(response);
        }
    } catch (error) {
        console.log(error)
    }
};

exports.get_all_user = async function (req, res) {
    try {
        const account = await Account.find({})
    
        if (account.length == 0) {
            return res.status(404).json;
        } else {
            return res.send(account);
        }
    } catch (error) {
        console.log(error)
    }
};