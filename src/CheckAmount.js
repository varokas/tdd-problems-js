CheckAmount = (function() {

    var value;

    function CheckAmount(val) {
        value = val;
    }

    var isOne = function (number) {
        return number === 1;
    }

    var getCurrency = function (number) {
        return isOne(number) ? 'dollar' : 'dollars'
    }

    var getNumberText = function(number) {
        var resultText = [];
        var context = {"number": number};

        var filters = [thousandFilter, hundredsFilter, tensFilter, digitFilter];

        filters.forEach(function(filter) {
            filter(resultText, context);
        });

        return resultText.filter(function(e) { return e != '' }).join(' ');
    }

    var thousandFilter = function(texts, context) {

        if((context.number / 1000) >= 1) {
            texts.push("one thousand");
        }

        context.number = context.number % 1000
    }

    var hundredsFilter = function(texts, context) {

        var hundred = parseInt(context.number / 100);
        if(hundred > 0) {
            digitFilter(texts, { number : hundred })
            texts.push("hundred")
        }

        context.number = context.number % 100
    }

    var tensFilter = function(texts, context) {

        if(context.number >= 20) {
            var tensText = {
                2: "twenty",
                3: "thirty",
                4: "fourty",
                5: "fifty",
                6: "sixty",
                7: "seventy",
                8: "eighty",
                9: "ninety",
            }

            texts.push(tensText[parseInt(context.number / 10)])
            context.number = context.number % 10
        }
    }

    var digitFilter = function(texts, context) {
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
        }

        texts.push(numberText[context.number]);
    }

    CheckAmount.prototype.toString = function () {
        return getNumberText(value) + ' ' + getCurrency(value);
    }

    return CheckAmount;
})();
