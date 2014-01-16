function CheckAmount(value) {
    this.value = value;
}

CheckAmount.prototype.toString = function () {
	var numberText = {
		'1': 'one dollar',
		'2': 'two dollars',
		'3': 'three dollars'
	}

	return numberText[this.value]
}