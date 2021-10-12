const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Number Input Tests', () => {
    test('Accepts and returns a whole number input', () => {
      assert.isNumber(convertHandler.getNum("1mi"), 'Did not return a number');
    });
    test('Accepts and returns a decimal number input', () => {
      assert.equal(convertHandler.getNum("1.1mi"), 1.1, 'Did not return a number');
    });
    test('Accepts and returns a fraction number input', () => {
      assert.isNumber(convertHandler.getNum("1/2mi"), 'Did not return a number');
    });
    test('Accepts and returns a fraction number w decimal input', () => {
      assert.isNumber(convertHandler.getNum("2.4/2mi"), 'Did not return a number');
    });
    test('If a double fraction is passed an error is returned', () => {
      assert.equal(convertHandler.getNum("3/2/3"), 'invalid number', 'Did not return error');
    });
    test('Returns 1 when no number input is given', () => {
      assert.isNumber(convertHandler.getNum("mi"), 'Did not return a number');
    });
  });
  suite('Unit Input Tests', () => {
    test('Accepts \'mi\' as input unit', () => {
      assert.strictEqual(convertHandler.getUnit("1mi"), 'mi', 'Did not return mi');
    });
    test('Accepts \'km\' as input unit', () => {
      assert.strictEqual(convertHandler.getUnit("1.1km"), 'km', 'Did not return km');
    });
    test('Accepts \'gal\' as input unit', () => {
      assert.strictEqual(convertHandler.getUnit("2gal"), 'gal', 'Did not return gal');
    });
    test('Accepts \'L\' as input unit', () => {
      assert.strictEqual(convertHandler.getUnit("12L"), 'L', 'Did not return L');
    });
    test('Accepts \'lbs\' as input unit', () => {
      assert.strictEqual(convertHandler.getUnit("3/4lbs"), 'lbs', 'Did not return lb');
    });
    test('Accepts \'kg\' as input unit', () => {
      assert.strictEqual(convertHandler.getUnit("0.7kg"), 'kg', 'Did not return kg');
    });
    test('Throws error with invalid input unit', () => {
      assert.equal(convertHandler.getUnit("0.7kgx"), 'invalid unit', 'Did not return error');
    });
  });
  suite('Unit Input Return Tests', () => {
    test('Returns correct unit for \'mi\' as input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("mi"), 'km', 'Did not return km');
    });
    test('Returns correct unit for \'km\' as input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("km"), 'mi', 'Did not return mi');
    });
    test('Returns correct unit for \'gal\' as input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("gal"), 'L', 'Did not return L');
    });
    test('Returns correct unit for \'L\' as input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("l"), 'gal', 'Did not return gal');
    });
    test('Returns correct unit for \'lbs\' as input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("lbs"), 'kg', 'Did not return kg');
    });
    test('Returns correct unit for \'kg\' as input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit("kg"), 'lbs', 'Did not return lbs');
    });
  });
  suite('Returns Correct Spelled Out Unit', () => {
    test('Returns correct spelling for \'mi\' as input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("mi"), 'miles', 'Did not return mile');
    });
    test('Returns correct spelling for \'km\' as input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("km"), 'kilometers', 'Did not return mi');
    });
    test('Returns correct spelling for \'gal\' as input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("gal"), 'gallons', 'Did not return L');
    });
    test('Returns correct spelling for \'L\' as input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("L"), 'liters', 'Did not return gal');
    });
    test('Returns correct spelling for \'lbs\' as input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("lbs"), 'pounds', 'Did not return kg');
    });
    test('Returns correct spelling for \'kg\' as input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit("kg"), 'kilograms', 'Did not return lb');
    });
  });
  suite('Correctly Converts Values', () => {
    test('Accepts input in mi and returns km', () => {
      assert.approximately(convertHandler.convert(1,"mi"), 1.61, 0.01, 'Did not convert to km');
    });
    test('Accepts input in km and returns to mi', () => {
      assert.approximately(convertHandler.convert(1,"km"), 0.62, 0.01, 'Did not convert to mi');
    });
    test('Accepts input in gal and returns L', () => {
      assert.approximately(convertHandler.convert(1,"gal"), 3.78, 0.01, 'Did not convert to L');
    });
    test('Accepts input in L and returns to gal', () => {
      assert.approximately(convertHandler.convert(1,"L"), 0.26, 0.01, 'Did not convert to gal');
    });
    test('Accepts input in lb and returns kg', () => {
      assert.approximately(convertHandler.convert(1,"lbs"), 0.45, 0.01, 'Did not convert to kg');
    });
    test('Accepts input in kg and returns to lbs', () => {
      assert.approximately(convertHandler.convert(1,"kg"), 2.20, 0.01, 'Did not convert to lbs');
    });
  });
});