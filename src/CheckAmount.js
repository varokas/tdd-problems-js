CheckAmount = (function() {

    var value;

    function CheckAmount(val) {
        value = val;
    }

    var numberText = {
            '1': 'one',
            '2': 'two',
            '3': 'three',
            '4': 'four',
            '5': 'five',
            '6': 'six',
            '7': 'seven',
            '8': 'eight',
            '9': 'nine',
            '10': 'ten',
            '11': 'eleven',
            '12': 'twelve',
            '13': 'thirteen',
            '14': 'fourteen',
            '15': 'fifteen',
            '16': 'sixteen',
            '17': 'seventeen',
            '18': 'eighteen',
            '19': 'nineteen'
    }

    var isOne = function () {
        return value === '1';
    }

    var getCurrency = function () {
        return isOne() ? 'dollar' : 'dollars'
    }

    CheckAmount.prototype.toString = function () {
        return numberText[value] + " " + getCurrency();
    }

    return CheckAmount;
})();