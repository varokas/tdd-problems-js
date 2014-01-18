function CheckAmount(value) {
    this.value = value;
}

CheckAmount.prototype.IsCurrencyNeedToBePluralrized = function () {

    return this.value != '1';

}

CheckAmount.prototype.GetCurrency = function () {
   
    var currency = "dollar";

    if (this.IsCurrencyNeedToBePluralrized()) {
        currency += "s";
    }
    
    return currency;
}

CheckAmount.prototype.toString = function () {

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
	}

	return numberText[this.value] +" " + this.GetCurrency();
}