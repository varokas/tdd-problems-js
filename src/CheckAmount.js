CheckAmount = (function() {

    function CheckAmount(value) {
        this.value = value;
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
        return this.value !== '1';
    }

    CheckAmount.prototype.GetCurrency = function () {
        return isOne() ? 'dollars' : 'dollar'
    }

    CheckAmount.prototype.toString = function () {
        return numberText[this.value] + " " + this.GetCurrency();
    }

    return CheckAmount;
})();