CheckAmount = (function() {

    var value;

    function CheckAmount(val) {
        value = val;
    }

    var numberText = {
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

    var isOne = function (number) {
        return number === 1;
    }

    var getCurrency = function (number) {
        return isOne(number) ? 'dollar' : 'dollars'
    }

    var getNumberText = function(number) {
    	var resultText = "";

    	if(number >= 20) {
    		resultText += tensText[parseInt(number/10)]

    		number = number - parseInt(number/10) * 10
    		if(number > 0) {
    			resultText += " ";
    		}
    	}

    	resultText += number != 0 ? numberText[number] : "";

    	return resultText;
    }

    CheckAmount.prototype.toString = function () {
        return getNumberText(value) + " " + getCurrency(value);
    }

    return CheckAmount;
})();