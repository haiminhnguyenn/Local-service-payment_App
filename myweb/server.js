// backend using nodejs
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
var http = require('http');
const bodyParser = require('body-parser');
const moment = require('moment-timezone')

const port = 8080
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appthuphi',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connection to database established successfully!');
  }
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM user WHERE username = ? AND password = ?',
    [username, password],
    (err, results, fields) => {
      console.log(results);
      if (err) {
        res.send({
          token: 'fail'
        });
      } else {
        if((results.length > 0)){
          res.send({
            token: 'success',
            uid: results[0].uid
          });
        }
      }
    }
  );
});

app.post("/getuserinformation", function(req, res){
  const uid = req.body.user;

  connection.query(
    'SELECT * FROM userinformation WHERE uid = ?',
    [uid],
    (err, results, fields) => {
      console.log(results);
      if (err) {
        res.send({
          token: 'fail'
        });
      } else {
        if((results.length > 0)){
          res.send({
            token: 'success',
            name: results[0].fullname, 
            birthday: results[0].birthday, 
            gender: results[0].gender, 
            hometown: results[0].hometown, 
            folk: results[0].folk, 
            nationality: results[0].nationality, 
            familycode: results[0].familycode, 
          });
        }
      }
    }
  );
});

app.post("/fetchtransactiondone", function(req, res){
  const year = req.body.currentYear;

  connection.query(
    'SELECT tid, phi.fid, feemoney, performdate, state FROM giaodich JOIN phi ON phi.fid = giaodich.fid WHERE YEAR(performdate) = ? AND state = ?',
    [year, 'success'],
    (err, results, fields) => {
      console.log(results);
      if (err) {
        res.send({
          token: 'fail'
        });
      } else {
        if((results.length > 0)){
          var money1 = 0, money2 = 0, time1 = 0, time2 = 0;
          const currentMonth = new Date().getMonth();
          for (let i = 0; i < results.length; i++) {
            money2 += results[i].feemoney;
            time2++;
            if(moment(results[i].performdate).tz("Asia/Bangkok").month() == currentMonth){
              console.log(moment(results[i].performdate).tz("Asia/Bangkok").month());
              money1 += results[i].feemoney;
              time1++;
            }
          }
          res.send({
            monthtransactiontime: time1,
            monthtransactionmoney: money1,
            yeartransactiontime: time2,
            yeartransactionmoney: money2,
          });
        }
      }
    }
  );
});

app.get("/test", function(req, res){
  res.send('Hello World!');
});

app.listen(port)