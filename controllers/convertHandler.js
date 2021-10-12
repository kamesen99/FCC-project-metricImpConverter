function ConvertHandler() {
  
  this.getNum = function(input) {

    if (!input.match('[0-9]')) {return 1};

    let i = input.indexOf('/');
    let divCount = 1;
    while(i >= 0) {
     i = input.indexOf('/', i+1);
     if (i > 0) {divCount++;}
    }
    if (divCount > 1) {return 'invalid number'};

    let j = input.indexOf('.');
    let periodCount = 1;
    while(j >= 0) {
     j = input.indexOf('.', j+1);
     if (j > 0) {periodCount++;}
    }
    if (periodCount > 1) {return 'invalid number'}

    let firstChar = input.match('[a-zA-Z]');
    
    let result = input.split(firstChar)[0];
    
    result = eval(result);

    if (!isNaN(result)) {
      return result;
    } else {
      return 'invalid number'
    }
  };
  
  this.getUnit = function(input) {
    let firstChar = input.match('[a-zA-Z]');
    let chars = input.substring(input.indexOf(firstChar)).toLowerCase();
    let result;

    switch(chars) {
      case "km":
        result = "km";
        break;
      case "mi":
        result = "mi";
        break;
      case "gal":
        result = "gal";
        break;
      case "l":
        result = "L";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "kg":
        result = "kg";
        break;
      default:
        result = 'invalid unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()) {
      case "km":
        result = "mi";
        break;
      case "mi":
        result = "km";
        break;
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
      result = 'invalid unit';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    switch(unit) {
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum/galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum/lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum/miToKm;
        break;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (!initNum || !initUnit || !returnNum || !returnUnit) return 'invalid string';
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
}

module.exports = ConvertHandler;
