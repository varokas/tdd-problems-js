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

    function isOne(number) {
        return number === 1;
    }

    function getCurrency(number) {
        return isOne(number) ? 'dollar' : 'dollars';
    }

    function getNumberText(number) {
        var resultText = millionFilter(number),
            isNotEmpty = function(e) { return e !== ''; };

        return resultText.flatten().filter(isNotEmpty).join(' ');
    }

    function millionFilter(number) {
        var million = parseInt(number / 1000000);
        return (million) ? [getNumberText(million), "million", thousandFilter(number % 1000000)]
                         : [thousandFilter(number % 1000000)];
    }

    function thousandFilter(number) {
        var thousand = parseInt(number / 1000);
        return (thousand) ? [getNumberText(thousand), "thousand", hundredsFilter(number % 1000)]
                          : [hundredsFilter(number % 1000)];
    }

    function hundredsFilter(number) {
        var hundred = parseInt(number / 100);
        return (hundred) ? [getNumberText(hundred), "hundred", tensFilter(number % 100)]
                         : [tensFilter(number % 100)];
    }

    function tensFilter(number) {
        var tens = parseInt(number / 10);
        return (tens > 1) ? [tensText[tens], digitFilter(number % 10)]
                          : [digitFilter(number)];
    }

    function digitFilter(number) {
        return [singleUnitText[number]];
    }

    CheckAmount.prototype.toString = function () {
        return getNumberText(value) + ' ' + getCurrency(value);
    };
};

Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  },[]);
};
