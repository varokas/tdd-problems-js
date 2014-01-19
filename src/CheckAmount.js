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
    	var resultText = "";
    	var context = {"number": number};

    	var filters = [tensFilter, digitFilter];

    	filters.forEach(function(filter) {
    		var text = filter(context);
    		if(text != "") {
    			resultText += (text + " ");
    		}
    	});

    	return resultText;
    }

    var tensFilter = function(context) {
    	var text = "";

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

    	    text = tensText[parseInt(context.number/10)]
    		context.number -= parseInt(context.number/10) * 10
    	}

    	return text; 
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
	    }

   		return numberText[context.number]; 	
    }

    CheckAmount.prototype.toString = function () {
        return getNumberText(value) + getCurrency(value);
    }

    return CheckAmount;
})();