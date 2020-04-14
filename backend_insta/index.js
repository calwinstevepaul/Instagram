var express =require('express')
var app= express()
var cors= require('cors')
var bodyparser = require('body-parser')
var multer = require('multer');
app.use(bodyparser());

const authcontroller = require("./controller/authController")();
const updatecontroller=require("./controller/updateController")();
const getdatacontroller=require('./controller/getdataController')();


const authpath = require("./router/authRout")(authcontroller);
const updatepath= require("./router/updateRout")(updatecontroller);
const getdatapath= require("./router/getdataRout")(getdatacontroller)

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('public'));
app.use('/auth',authpath.getRouter());
app.use('/update',updatepath.getRouter());
app.use('/getdata',getdatapath.getRouter()); 

app.listen(9000,()=>{
    console.log('listening....... 9000')
})
