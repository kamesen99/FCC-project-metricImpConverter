'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let inputStr = req.query.input;
    let initNum = convertHandler.getNum(inputStr);
    let initUnit = convertHandler.getUnit(inputStr);
    let returnNum;
    if (initNum !== 'invalid number' && initUnit !== 'invalid unit') {
      returnNum = convertHandler.convert(initNum, initUnit);
    }
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let initUnitStr = convertHandler.spellOutUnit(initUnit);
    let returnUnitStr = convertHandler.spellOutUnit(returnUnit)
    let string = convertHandler.getString(initNum, initUnitStr, returnNum, returnUnitStr);

    let data = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum ? returnNum : '',
      returnUnit: returnUnit,
      string: string
    };

    let response = '';
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      response = 'invalid number and unit';
    } else if (initUnit === 'invalid unit') {
      response = initUnit;
    } else if (initNum === 'invalid number') {
      response = initNum;
    }

    if (response !== '') {
      res.status(200).type('text').send(response)
    } else {
      res.json(data);
    }

    // document.getElementById('result').innerHtml = 
    // document.querySelector('#result').innerHtml = '<p> this is my result </p>';
  });

  app.use((req, res, next) => {
    res.status(500).type('text').send('Not found');
  });
};
