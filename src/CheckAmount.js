CheckAmount = (function() {

    var value;

    function CheckAmount(val) {
        value = val;
    }

    var isOne = function (number) {
        return number === 1;
    }

    var getCurrency = function (number) {
        return isOne(number) ? 'dollar' : 'dollars';
    }

    var getNumberText = function(number) {
        var context = {"number": number};

        var resultText = millionFilter(context);
        return resultText.flatten().filter(function(e) { return e != '' }).join(' ');
    }

    var millionFilter = function(context) {
        var million = parseInt(context.number / 1000000);
        context.number = context.number % 1000000;

        return (million) ? [getNumberText(million), "million", thousandFilter(context)] : [thousandFilter(context)];
    }

    var thousandFilter = function(context) {
        var thousand = parseInt(context.number / 1000);
        context.number = context.number % 1000;

        return (thousand) ? [getNumberText(thousand), "thousand", hundredsFilter(context)] : [hundredsFilter(context)]
    }

    var hundredsFilter = function(context) {
        var hundred = parseInt(context.number / 100);
        context.number = context.number % 100;

        return (hundred) ? [getNumberText(hundred), "hundred", tensFilter(context)] : [tensFilter(context)]
    }

    var tensFilter = function(context) {
        var tensText = {
            2: "twenty",
            3: "thirty",
            4: "fourty",
            5: "fifty",
            6: "sixty",
            7: "seventy",
            8: "eighty",
            9: "ninety",
        };

        return (context.number >= 20) ? [tensText[parseInt(context.number / 10)], digitFilter({number : context.number % 10})] : [digitFilter(context)];
    }

    var digitFilter = function(context) {
        var numberText = {
            0: '',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine',
            10: 'ten',
            11: 'eleven',
            12: 'twelve',
            13: 'thirteen',
            14: 'fourteen',
            15: 'fifteen',
            16: 'sixteen',
            17: 'seventeen',
            18: 'eighteen',
            19: 'nineteen'
        };

        return [numberText[context.number]];
    }

    CheckAmount.prototype.toString = function () {
        return getNumberText(value) + ' ' + getCurrency(value);
    }

    return CheckAmount;
})();

Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  },[]);
};
