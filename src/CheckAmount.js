var CheckAmount = function(value) {

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

    var singleUnitText = {
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

    var hundredsFilter = createNestedFilter(100,     "hundred",  baseFilter),
        thousandFilter = createNestedFilter(1000,    "thousand", hundredsFilter),
        millionFilter  = createNestedFilter(1000000, "million",  thousandFilter);

    function getCurrency(number) {
        var isOne = number === 1;
        return isOne ? 'dollar' : 'dollars';
    }

    function baseFilter(number) {
        var tens  = parseInt(number / 10);
        var digit = number % 10;
        return (tens > 1) ? [(digit) ? tensText[tens] + "-" + singleUnitText[digit] : tensText[tens]]
                          : [singleUnitText[number]];
    }

    function createNestedFilter(base, name, nextFilter) {
        return function(number) {
            var unit = parseInt(number / base);
            return (unit) ? [numberToText(unit), name, nextFilter(number % base)]
                          : [nextFilter(number % base)];
        };
    }

    function numberToText(number) {
        var isNotEmpty = function(e) { return e !== ''; };
        return millionFilter(number).flatten().filter(isNotEmpty).join(' ');
    }

    CheckAmount.prototype.toString = function () {
        return numberToText(value) + ' ' + getCurrency(value);
    };
};

Array.prototype.flatten = function() {
    return this.reduce(function(prev, cur) {
        var more = [].concat(cur).some(Array.isArray);
        return prev.concat(more ? cur.flatten() : cur);
    },[]);
};
