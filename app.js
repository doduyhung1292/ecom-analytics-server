const express = require('express'); 
const app = express(); 
const port = 8080; 
var cors = require('cors')

const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = 'mongodb://localhost:27017/products';
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors())


const product = require('./routes/Product.route'); 
const keyword = require('./routes/Keyword.route'); 
const account = require('./routes/Account.route'); 
const category = require('./routes/Category.route'); 


// Get top product
// Get revenue
app.use('/products', product);

app.use('/keywords', keyword);

app.use('/account', account);

app.use('/category', category);
//get category
//app.use('/category', category);


app.listen(port, () => {
    console.log('app running on port' + port)
})