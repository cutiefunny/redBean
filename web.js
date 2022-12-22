//#region 초반 선언부
const express = require('express');
const port = 8005;
const http = require('https'); 
const path = require('path');
const moment = require('moment');
var cron = require('node-cron');
const bodyparser= require('body-parser');
const router = require('./router');
const ajax = require('./ajax');
const CRUD= require("./CRUD");
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/view');

app.use('/script',express.static(__dirname + "/script"));
app.use('/view',express.static(__dirname + "/view"));
app.use('/image',express.static(__dirname + "/image"));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

const { response, request } = require('express');
const { createConnection } = require('net');
//#endregion

//#region 리스닝 및 라우팅

//리스닝
app.listen(port, ()=>{
    console.log('8005번 포트에 대기중!');
})
console.log("server started");
console.log(moment().format('YYYY-MM-DD HH:mm'));

//라우터
app.get('/', router.main);
app.get('/manage', router.manage);

//ajax 컨트롤러
app.post('/ajax', ajax.controller);

//#endregion